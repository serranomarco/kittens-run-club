import { OpenAI } from 'openai'

const API_KEY = process.env['NEXT_PUBLIC_OPENAI_API_KEY']

const openAIClient = new OpenAI({
    apiKey: API_KEY,
})

export default openAIClient
