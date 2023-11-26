<script lang=ts>
    import { page } from "$app/stores";
	import { afterNavigate } from "$app/navigation";
	import { onDestroy, onMount } from "svelte";
    import { ViewListing, PageModal } from "../../../../../components/index.ts";
	import { connectToHub, disconnectFromHub, invokeHubMethod, isPageModalOpen } from "../../../../../stores/index.ts";
	import { calculateRemainingTime, getStatus, useSignalRHub } from "$lib/functions/index.ts";
    import type { Bid, CallbackMap, ViewData } from "$lib/types/types.ts";
    import { API_URL } from "$lib/functions/index.ts";

    export let data: ViewData;

    let loaded: boolean = false;
    let interval: NodeJS.Timeout;

    $: if (data.auctionListing) {
        data.remainingTime = calculateRemainingTime(new Date(data.auctionListing.endTime.toString()).getTime()) 
        if (interval == null) {
            interval = setInterval(() => { 
                data.remainingTime = calculateRemainingTime(new Date(data.auctionListing.endTime.toString()).getTime()) 
            }, 500);
        }
    }

    $: data.bidText = getStatus(data.currentBid, data.remainingTime, $page.data.user);

    afterNavigate(() => loaded = true);

    const callbacks: CallbackMap = {
        "NewBid": (res: Bid) => { 
            data.currentBid = res; 
            data.bidHistory = [...data.bidHistory, data.currentBid];
            data.currentBid.time = new Date();
        },
        "AddFavorite": (id: number, remove: boolean) => {
            if (remove) {
                data.favorites.splice(data.favorites.indexOf(id), 1);
                return;
            }
            data.favorites = [...data.favorites, id];
        }
    };
    
    onMount(async() => {
        connectToHub(await useSignalRHub(
            `${API_URL}/auction-hub`,
            callbacks
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