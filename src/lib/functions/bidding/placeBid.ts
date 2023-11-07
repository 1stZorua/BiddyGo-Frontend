export async function placeBid(
  hubConnection: signalR.HubConnection | null,
  auctionListingId: number,
  bidderId: number,
  amount: number
) {
  try {
    await hubConnection?.invoke("PlaceBid", auctionListingId, bidderId, amount);
  } catch (error) {
    console.error(`Failed to place bid: ${error}`);
  }
}