import { sendRequest } from "../index.ts"

export async function fetchMultipleRequests(
    requests: Array<{ url: string, method: string, data?: object }>, 
) {

    const requestPromises = requests.map(r => {
        return sendRequest(r.url, r.method, r.data);
    })

    return await Promise.all(requestPromises);
}