import { fetchWrapper } from '../fetchWrapper'
import {
    Athlete,
    AthleteRun,
    StravaAccessToken,
    StravaAPIResponseActivity,
    StravaAPIResponseAuthenticatedAthlete,
} from './interface'
import { stravaResponseProcessor } from './stravaResponseProcessor'

const BASE_URL = `https://${process.env.NEXT_PUBLIC_STRAVA_API_URL}`
const OAUTH_URL = `https://${process.env.NEXT_PUBLIC_STRAVA_OAUTH_URL}`
const REDIRECT_URI = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI
const CLIENT_ID = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID
const SCOPE = 'activity:read_all'

export const stravaClient = () => {
    const processor = stravaResponseProcessor()
    // After OAuth authentication process is complete save access token in local storage
    // TODO: Add support for OAuth authentication
    const getAccessToken = () => {
        // No guarantee that this will run in a client component so let's add a check
        // that the window object exists
        if (global?.window !== undefined) {
            return localStorage.getItem('strava_access_token') || ''
        }
    }

    const authHeaders = {
        Authorization: `Bearer ${getAccessToken()}`,
    }

    const getAthlete = async (): Promise<Athlete> => {
        const response = (await fetchWrapper.get(
            BASE_URL,
            '/athlete',
            authHeaders
        )) as StravaAPIResponseAuthenticatedAthlete
        return processor.processAthlete(response)
    }

    const getActivities = async (): Promise<AthleteRun[]> => {
        const response = (await fetchWrapper.get(
            BASE_URL,
            '/athlete/activities?per_page=15',
            authHeaders
        )) as StravaAPIResponseActivity[]

        return processor.processActivities(response)
    }

    const redirectToOAuthPage = () => {
        window.location.href = `${OAUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=${SCOPE}`
    }

    const refreshAccessToken = async () => {
        // Grab code from url params and check if it is present to refresh access token. This interaction
        // should only happen after we authorize via OAuth
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')

        if (!code || localStorage.getItem('strava_access_token')) return null

        const response = await fetch('/api/strava/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        })

        const data = (await response.json()) as StravaAccessToken

        // Set our access token from strava to local storage until we have a better solution for this
        // ex. cookie, fs, etc.
        localStorage.setItem('strava_access_token', data.access_token)
    }

    // TODO: Add Activities and some way to process strava response data (function here or seperate helper?)
    return {
        getAthlete,
        getActivities,
        redirectToOAuthPage,
        refreshAccessToken,
    }
}

export default stravaClient
