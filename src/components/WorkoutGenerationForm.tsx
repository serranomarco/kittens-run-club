import { ChangeEvent, FormEvent, useState } from 'react'
import { OpenAIResponse } from '../pages/api/workout_generation'

export interface WorkoutGenerationFormData {
    numOfMiles?: number
    timeConstraint?: number
    workoutType: string
    paceTarget?: number
}

const WorkoutGenerationForm = () => {
    const [formData, setFormData] = useState<WorkoutGenerationFormData>({
        workoutType: '',
    })
    const [isTimeConstraint, setIsTimeConstraint] = useState<Boolean>(false)

    const updateFormData = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const generateWorkout = async () => {
        const response = await fetch('/api/workout_generation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })

        const data = (await response.json()) as OpenAIResponse
        console.log(data)
    }

    return (
        <form style={{ display: 'flex', flexDirection: 'column' }}>
            <label>
                Toggle for Time Constraint instead of Miles
                <input
                    type="checkbox"
                    onClick={() => {
                        setIsTimeConstraint(!isTimeConstraint)
                    }}
                />
            </label>
            {!isTimeConstraint ? (
                <label>
                    Number of Miles:
                    <input
                        name="numOfMiles"
                        type="number"
                        onChange={(e) => {
                            updateFormData(e)
                        }}
                    />
                </label>
            ) : (
                <label>
                    Time Constraint:
                    <input
                        name="timeConstraint"
                        type="number"
                        onChange={(e) => {
                            updateFormData(e)
                        }}
                    />
                </label>
            )}
            <label>
                Workout Type:
                <select
                    name="workoutType"
                    onChange={(e) => {
                        updateFormData(e)
                    }}
                >
                    <option value="tempo">Tempo</option>
                    <option value="hills">Hills</option>
                    <option value="intervals">Intervals</option>
                </select>
            </label>
            <label>
                Pace Target:
                <input
                    name="paceTarget"
                    type="number"
                    onChange={(e) => {
                        updateFormData(e)
                    }}
                />
                min/mile
            </label>
            <button
                style={{ width: '80px' }}
                onClick={(e) => {
                    e.preventDefault()

                    generateWorkout()
                }}
            >
                Generate workout
            </button>
        </form>
    )
}

export default WorkoutGenerationForm
