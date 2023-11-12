import { API_URL } from "..";

export async function sendRequest<T>(
    url: string, 
    method: string, 
    data: T | null = null
): Promise<T> {
    
    url = `${API_URL}${url}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,
    };
  
    try {
        const response = await fetch(url, options);
  
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
  
        const responseData = await response.json();
        return responseData as T;
    } catch (error) {
        throw new Error(`Request error: ${(error as Error).message}, ${(error as Error).cause}`);
    }
}