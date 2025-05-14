'use client'

// TODO: REMOVE THIS AFTER TESTING IS COMPLETE

import { useEffect, useState } from 'react'
import { stravaClient } from '@/src/app/lib/api/strava/stravaClient'
import { Athlete } from '../lib/api/strava/interface'
import openAIClient from '../lib/api/openai/config'

export default function Testing() {
    const [athlete, setAthlete] = useState<Athlete>({
        id: 0,
        firstname: 'John',
        lastname: 'Test',
        username: 'test',
    })
    const [openAIResponse, setOpenAIResponse] = useState('')
    const client = stravaClient()

    useEffect(() => {
        const fetchAthlete = async () => {
            const athlete = await client.getAthlete()
            setAthlete(athlete as Athlete)
        }

        const generateWorkout = async () => {
            const response = await openAIClient.responses.create({
                input: 'Generate a chest workout in just JSON format without markup syntax',
                instructions: 'You are a personal trainer',
                model: 'gpt-4o-mini',
            })

            setOpenAIResponse(response.output_text)
        }

        client.refreshAccessToken()
        fetchAthlete()
        // DO NOT UNCOMMENT UNLESS YOU ARE TESTING
        // EACH REQUEST COST $$$$
        // generateWorkout()
    }, [])

    return (
        <>
            <button onClick={client.redirectToOAuthPage}>Log In</button>
            <h1>athlete: {athlete.firstname}</h1>
            <h1>openai response: {openAIResponse}</h1>
        </>
    )
}
