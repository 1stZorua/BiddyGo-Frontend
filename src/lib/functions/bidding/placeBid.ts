export async function placeBid(
  hubConnection: signalR.HubConnection | null,
  auctionListingId: number,
  amount: number
) {
  try {
    await hubConnection?.invoke("PlaceBid", auctionListingId, amount);
  } catch (error) {
    console.error(`Failed to place bid: ${error}`);
  }
}