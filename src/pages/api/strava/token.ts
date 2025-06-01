import { StravaAccessToken } from '@/src/lib/api/strava/interface'
import { NextApiRequest, NextApiResponse } from 'next'

const CLIENT_ID = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID
const CLIENT_SECRET = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<StravaAccessToken>
) {
    const { code } = req.body

    const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
        }),
    })

    const data = await response.json()

    return res.status(200).json(data)
}
