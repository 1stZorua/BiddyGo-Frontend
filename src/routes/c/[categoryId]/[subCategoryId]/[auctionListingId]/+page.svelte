<script lang=ts>
    import { page } from "$app/stores";
    import { ViewListing } from "../../../../../components/index.ts";

    const auctionListingId: string = $page.params.auctionListingId;
</script>

<ViewListing auctionListingId={auctionListingId}></ViewListing>
