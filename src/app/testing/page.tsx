'use client'

// TODO: REMOVE THIS AFTER TESTING IS COMPLETE

import { useEffect, useState } from 'react'
import { stravaClient } from '@/src/app/lib/api/strava/stravaClient'

export default function Testing() {
    const [athlete, setAthlete] = useState({})

    useEffect(() => {
        const fetchAthlete = async () => {
            const client = stravaClient()
            const athlete = await client.getAthlete()
            console.log(athlete)
            setAthlete(athlete)
        }
        fetchAthlete()
    }, [])

    return <h1>athlete: {athlete?.firstname}</h1>
}
