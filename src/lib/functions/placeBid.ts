export async function placeBid(
  hubConnection: signalR.HubConnection,
  auctionListingId: number,
  amount: number
) {
  try {
    await hubConnection.invoke("PlaceBid", auctionListingId, amount);
  } catch (error) {
    console.error(`Failed to place bid: ${error}`);
  }
}