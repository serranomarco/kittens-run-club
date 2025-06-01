import { WorkoutGenerationFormData } from '@/src/components/WorkoutGenerationForm'
import openAIClient from '@/src/lib/api/openai/config'
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export interface OpenAIResponse {
    workout_title: string
    goal: string
    total_distance_miles: number
    segments: Segment[]
    notes: string
}

export type Segment = BasicSegment | NestedSegment

export interface BasicSegment {
    name: string
    type: string
    repetitions: number
    distance_miles: number
    duration_minutes: number
    intensity: number
    details: string
}

export interface NestedSegment {
    name: string
    type: string
    repetitions: number
    segments: SubSegment[]
}

export interface SubSegment {
    name: string
    type: string
    distance_miles: number
    duration_minutes: number
    target_pace: number
    intensity: number
    details: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<OpenAIResponse>
) {
    const formData: WorkoutGenerationFormData = req.body
    const exampleWorkoutJson = JSON.parse(
        fs.readFileSync('example_workout.json', 'utf-8')
    )
    const workoutTypeInput = `Generate a ${formData.workoutType} workout `
    const lengthInput = formData.numOfMiles
        ? `that is ${formData.numOfMiles} miles `
        : `that takes ${formData.timeConstraint} minutes `
    const paceTargetInput = ` and is around a ${formData.paceTarget} seconds per mile pace `
    const responseJsonInput = `and return only a JSON object in this format: ${JSON.stringify(exampleWorkoutJson)} with no markdown and convert seconds per mile to minutes per mile`

    const openAIInput =
        workoutTypeInput + lengthInput + paceTargetInput + responseJsonInput

    const response = await openAIClient.responses.create({
        input: openAIInput,
        instructions: 'You are a running coach',
        model: 'gpt-4o-mini',
    })
    const data = JSON.parse(response.output_text) as OpenAIResponse

    return res.status(200).json(data)
}
