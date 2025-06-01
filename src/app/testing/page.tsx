'use client'

// TODO: REMOVE THIS AFTER TESTING IS COMPLETE

import { useEffect, useState } from 'react'
import { stravaClient } from '../../lib/api/strava/stravaClient'
import { Athlete } from '../../lib/api/strava/interface'
import WorkoutGenerationForm from '@/src/components/WorkoutGenerationForm'

export default function Testing() {
    const [athlete, setAthlete] = useState<Athlete>({
        id: 0,
        firstName: 'John',
        lastName: 'Test',
        username: 'test',
    })
    const [openAIResponse, setOpenAIResponse] = useState('')
    const client = stravaClient()

    const fetchActivities = async () => {
        const activities = await client.getActivities()
        console.log(activities)
    }

    useEffect(() => {
        const fetchAthlete = async () => {
            const athlete = await client.getAthlete()
            setAthlete(athlete)
        }
        client.refreshAccessToken()
        fetchAthlete()
    }, [])

    return (
        <>
            <button onClick={client.redirectToOAuthPage}>Log In</button>
            <button onClick={fetchActivities}>Get Activities</button>
            <h1>athlete: {athlete.firstName}</h1>
            <h1>openai response: {openAIResponse}</h1>
            <WorkoutGenerationForm />
        </>
    )
}
