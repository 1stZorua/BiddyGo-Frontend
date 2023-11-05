import * as signalR from "@microsoft/signalr";

export async function useSignalRHub<T>(
    url: string,
    method: string,
    onReceived: (data: T) => void
) {
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(url)
        .configureLogging(signalR.LogLevel.Information)
        .build()

    hubConnection.on(method, (data) => {
        onReceived(data);
    });

    try {
        await hubConnection.start();
    } catch (error) {
        console.error(`SignalR connection error: ${error}`);
    }

    return hubConnection;
}