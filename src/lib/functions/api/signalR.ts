import type { CallbackMap } from "$lib/types/types";
import * as signalR from "@microsoft/signalr";

export async function useSignalRHub(
    url: string,
    callbacks: CallbackMap
) {
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(url)
        .configureLogging(signalR.LogLevel.Information)
        .build()

    Object.entries(callbacks).forEach(([method, callback]) => {
        hubConnection.on(method, (...args) => {
            callback(...args);
        });
    });

    try {
        await hubConnection.start();
    } catch (error) {
        console.error(`SignalR connection error: ${error}`);
    }

    return hubConnection;
}