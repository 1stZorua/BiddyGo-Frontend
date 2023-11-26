export async function addFavorite(
    hubConnection: signalR.HubConnection | null,
    userId: number,
    auctionListingId: number | undefined,
    remove: boolean = false
  ) {
    try {
      await hubConnection?.invoke("AddFavorite", userId, auctionListingId, remove);
    } catch (error) {
      console.error(`Failed to add favorite: ${error}`);
    }
  }