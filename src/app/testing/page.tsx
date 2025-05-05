'use client'

// TODO: REMOVE THIS AFTER TESTING IS COMPLETE

import { useEffect, useState } from 'react'
import { stravaClient } from '@/src/app/lib/api/strava/stravaClient'
import { Athlete } from '../lib/api/strava/interface'

export default function Testing() {
    const [athlete, setAthlete] = useState<Athlete>({
        id: 0,
        firstname: 'John',
        lastname: 'Test',
        username: 'test',
    })
    const client = stravaClient()

    useEffect(() => {
        const fetchAthlete = async () => {
            const athlete = await client.getAthlete()
            setAthlete(athlete as Athlete)
        }
        client.refreshAccessToken()
        fetchAthlete()
    }, [])

    return (
        <>
            <button onClick={client.redirectToOAuthPage}>Log In</button>
            <h1>athlete: {athlete.firstname}</h1>
        </>
    )
}
