import { fetchWrapper } from '@/src/app/lib/api/fetchWrapper'

const BASE_URL = `https://${process.env.NEXT_PUBLIC_STRAVA_API_URL}`

export const stravaClient = () => {
    // After OAuth authentication process is complete save access token in local storage
    // TODO: Add support for OAuth authentication
    const getAccessToken = () => {
        return localStorage.getItem('strava_access_token') || ''
    }

    const authHeaders = {
        Authorization: `Bearer ${getAccessToken}`,
    }

    // TODO: Add Activities and some way to process strava response data (function here or seperate helper?)
    return {
        getAthlete: () => fetchWrapper.get(BASE_URL, '/athlete', authHeaders),
    }
}

export default stravaClient
