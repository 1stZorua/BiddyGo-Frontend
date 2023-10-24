<script lang=ts>
    import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { sendRequest } from "$lib/functions/request";
    import { ViewListing } from "../../../../../components/index.ts";

    const auctionListingId: string = $page.params.auctionListingId;
</script>

<ViewListing auctionListingId={auctionListingId}></ViewListing>
