// Get method for fetching data from an api
const get = async (
    url: string,
    path: string,
    headers: Record<string, string>
): Promise<unknown> => {
    const options: RequestInit = {
        method: 'GET',
        headers: headers || {},
    }

    console.log(process.env)

    const response = await fetch(`${url}${path}`, options)
    return handleResponse(response)
}

// Get fetch API response and throw error if not ok. Potential to do more error handling here, but for now this is
// fine.
const handleResponse = async (response: Response): Promise<unknown> => {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}

export const fetchWrapper = {
    get,
}

export default fetchWrapper
