<script lang=ts>
    import { page } from "$app/stores";
	import { afterNavigate } from "$app/navigation";
	import { onDestroy, onMount } from "svelte";
    import { ViewListing, PageModal } from "../../../../../components/index.ts";
	import { connectToHub, disconnectFromHub, invokeHubMethod, isPageModalOpen } from "../../../../../stores/index.ts";
	import { calculateRemainingTime, useSignalRHub } from "$lib/functions/index.ts";
    import type { Bid, ViewData } from "$lib/types/types.ts";
    import { API_URL } from "$lib/functions/index.ts";

    export let data: ViewData;

    let loaded: boolean = false;
    let interval: NodeJS.Timeout;

    $: if (data.auctionListing) {
        data.remainingTime = calculateRemainingTime(new Date(data.auctionListing.endTime.toString()).getTime()) 
        if (interval == null) {
            interval = setInterval(() => { 
                data.remainingTime = calculateRemainingTime(new Date(data.auctionListing.endTime.toString()).getTime()) 
            }, 1000);
        }
    }

    afterNavigate(() => loaded = true);
    
    onMount(async() => {
        connectToHub(await useSignalRHub<Bid>(
            `${API_URL}/auction-hub`, "NewBid", 
            (res) => { 
                data.currentBid = res; 
                data.bidHistory = [...data.bidHistory, data.currentBid]; 
            }
        ));
        invokeHubMethod("JoinGroup", `auction_${$page.params.auctionListingId}`);
    });

    onDestroy(() => {
        clearInterval(interval);
        disconnectFromHub();
    });
</script>

<ViewListing {loaded} {data}></ViewListing>
{#if $isPageModalOpen}
    <PageModal {...data} thumbnailImage={data.auctionListingImages[0]}></PageModal>
{/if}