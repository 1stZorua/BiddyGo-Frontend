import { writable } from 'svelte/store';

let connection: signalR.HubConnection | null;

export const hubConnection = writable<signalR.HubConnection | null>(null);


function isConnected() {
    return (connection && connection.state === "Connected");
}

export function connectToHub(conn: signalR.HubConnection) {
    hubConnection.set(conn);
    connection = conn;
}

export function disconnectFromHub() {
    if (isConnected()) {
        connection?.stop();
    }
    connection = null;
    hubConnection.set(null);
}

export async function invokeHubMethod(methodName: string, arg: string) {
    if (!isConnected()) return;

    try {
        await connection?.invoke(methodName, arg);
    } catch (error) {
        console.log((error as Error).message);
    }
}