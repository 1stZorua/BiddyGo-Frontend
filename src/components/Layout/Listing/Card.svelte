<script lang=ts>
    import { onMount } from "svelte";
	import { sendRequest } from "$lib/functions/request";
    import truncateText from "$lib/functions/truncateText.ts";
    import type { AuctionListing, Image } from "$lib/types/types";
    import { SecondaryText, SmallText, MediumText } from "../../index.ts";

    let thumbnailImage: Image;

    export let active: boolean = true;
    export let auctionListing: AuctionListing = {
        id: 0,
        subCategoryId: 0,
        title: "The Pokemon Mystery box - Blastoise",
        description: "placeholder",
        startingBid: 20,
        reservePrice: 0,
        startTime: new Date('2023-07-11T00:00:00'),
        endTime: new Date('2023-07-11T00:00:00'),
        sellerId: 0
    };

    onMount(async() => {
        if (!active) return;
        thumbnailImage = await sendRequest(`/api/AuctionListing/thumbnail/${auctionListing.id}`, "GET");
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
            <MediumText active={active}>&euro; {auctionListing.startingBid}</MediumText>
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