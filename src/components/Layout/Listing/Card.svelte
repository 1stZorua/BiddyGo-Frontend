<script lang=ts>
    import { onMount } from "svelte";
    import { fetchMultipleRequests, formatCurrency, truncateText } from "$lib/functions/index.ts";
    import type { AuctionListing, Bid, Image } from "$lib/types/types";
	import { defaultAuctionListing } from "$lib/types/defaults.ts";
    import { SecondaryText, SmallText, MediumText } from "../../index.ts";

    let thumbnailImage: Image;
    let currentBid: Bid;

    export let active: boolean = true;
    export let auctionListing: AuctionListing = defaultAuctionListing;

    onMount(async() => {
        if (!active) return;
        const [bidResponse, thumbnailResponse] = await fetchMultipleRequests(
            [
                { url: `/api/Bid/highest/${auctionListing.id}`, method: "GET" },
                { url: `/api/AuctionListing/thumbnail/${auctionListing.id}`, method: "GET" }
            ]
        );
        [currentBid, thumbnailImage] = [bidResponse as Bid, thumbnailResponse as Image];
    });
</script>

<a rel="external" href={active ? [window.location.href, auctionListing.subCategoryId, auctionListing.id].join("/") : ""} class="card" draggable="false">
    <div class="display">
        {#if thumbnailImage}
            <img src={"data:image/jpeg;base64," + thumbnailImage?.fileContents} alt={auctionListing.title} draggable="false" loading="lazy">
        {:else}
            <div></div>
        {/if}
    </div>
    <div class="text">
        <SmallText active={active}>{truncateText(auctionListing.title, 50)}</SmallText>
        <div>
            <SecondaryText active={active} --color="#7A7A7A">Current Bid</SecondaryText>
            <MediumText active={currentBid ? true : false}>&euro; {currentBid ? formatCurrency(currentBid.amount) : 0}</MediumText>
        </div>
        <SecondaryText active={active} --color="#7A7A7A" --font-family="Poppins" --font-weight="500" --text-transform="normal">{auctionListing.startTime} left</SecondaryText>
    </div>
</a>

<style lang=scss>
.card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    overflow: hidden;
    border-radius: $btn-border-radius-normal $btn-border-radius-normal 0 0;

    &:hover {
        .display img {
            scale: $transition-scale;
        }
    }
}

.display {
    height: 350px;
    overflow: hidden;

    img {
        border-radius: $btn-border-radius-normal $btn-border-radius-normal 0 0;
        width: 100%;
        height: 100%;
        transition:
            scale $transition-normal;
    }

    div {
        background: $skeleton-background-color;
        background-size: 200% 100%; 
        animation: $skeleton-animation;
        width: 100%;
        height: 100%;
        border-radius: $btn-border-radius-normal $btn-border-radius-normal 0 0;
    }
}

.text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    div {
        display: flex;
        flex-direction: column;
    }
}
</style>