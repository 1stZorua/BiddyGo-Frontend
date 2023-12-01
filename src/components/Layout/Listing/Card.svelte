<script lang=ts>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { addFavorite, calculateRemainingTime, fetchMultipleRequests, formatCurrency, formatRemainingTime, getStatus, sendRequest, truncateText } from "$lib/functions/index.ts";
    import type { AuctionListing, Bid, Favorite, Image, RemainingTime, SubCategory } from "$lib/types/types";
	import { defaultAuctionListing, defaultRemainingTime } from "$lib/types/defaults.ts";
    import { SecondaryText, SmallText, MediumText, FavoriteButton } from "../../index.ts";
    import { getFlash } from "sveltekit-flash-message/client";
    import { hubConnection } from "../../../stores/hubStore.ts";

    const flash = getFlash(page);

    export let active: boolean = true;
    export let auctionListing: AuctionListing = defaultAuctionListing;
    export let format: "grid" | "lines" = "grid";

    let loaded: boolean = false;
    let subCategory: SubCategory;
    let thumbnailImage: Image;
    let currentBid: Bid;
    let remainingTime: RemainingTime = defaultRemainingTime;
    let previousAuctionListing: AuctionListing;
    let favorites: number[] = [];
    
    $: isFavorited = favorites.includes(Number($page.data.user?.id)) ? true : false
    $: bidText = getStatus(currentBid, remainingTime, $page.data.user);
    $: {
        if (auctionListing !== previousAuctionListing) {
            fetchData();
            previousAuctionListing = auctionListing;
        }
    }

    async function fetchData() {
        if (!active) return;
        const [subCategoryResponse, bidResponse, thumbnailResponse, favoritesResponse] = await fetchMultipleRequests(
            [
                { url: `/api/SubCategory/${auctionListing.subCategoryId}`, method: "GET" },
                { url: `/api/Bid/highest/${auctionListing.id}`, method: "GET" },
                { url: `/api/AuctionListing/thumbnail/${auctionListing.id}`, method: "GET" },
                { url: `/api/Favorite/auction-listing/${auctionListing.id}`, method: "GET" }
            ]
        );
        [subCategory, currentBid, thumbnailImage, favorites] = [subCategoryResponse as SubCategory, bidResponse as Bid, thumbnailResponse as Image, favoritesResponse as number[]];

        remainingTime = calculateRemainingTime(new Date(auctionListing.endTime.toString()).getTime())
        loaded = true;
    }

    async function onFavorite() {
        if (!$page.data.user) {
            flash.set({type: "error", message: "You need to be logged in to favorite an auction listing."});
            return;
        }

        const favorite: Favorite = {
            auctionListingId: auctionListing.id,
            userId: Number($page.data.user.id)
        }

        if (favorites.includes(favorite.userId)) {
            favorites.splice(favorites.indexOf(favorite.userId), 1);
        } else {
            favorites.push(favorite.userId);
        }

        isFavorited = favorites.includes(favorite.userId);
        favorites.length = favorites.length;

        await sendRequest(`/api/Favorite`, "POST", favorite);
        await addFavorite($hubConnection, favorite.userId, favorite.auctionListingId);
    }

    onMount(async() => fetchData());
</script>

<a 
    rel="external" 
    href={loaded ? ["/c", subCategory.categoryId, subCategory.id, auctionListing.id].join("/") : ""} 
    class="card" 
    class:lines={format === "lines"}
    draggable="false" 
    data-sveltekit-preload-data
>
    <button class="favorite" on:click|preventDefault>
        <FavoriteButton 
            active={loaded}
            isFavorited={isFavorited}
            onClick={onFavorite}
        >
            <SmallText --height="max-content">{favorites.length}</SmallText>
        </FavoriteButton>
    </button>
    <div class="display">
        {#if thumbnailImage}
            <img src={"data:image/jpeg;base64," + thumbnailImage?.fileContents} alt={auctionListing.title} draggable="false" loading="lazy">
        {:else}
            <div></div>
        {/if}
    </div>
    <div class="text">
        <SmallText --height="60px" active={loaded}>{truncateText(auctionListing.title, 50)}</SmallText>
        <div>
            <SecondaryText active={loaded} --color={bidText.includes("You") ? "#57C5B6" : "#7A7A7A"}>{bidText}</SecondaryText>
            <MediumText active={currentBid ? true : false}>&euro; {currentBid ? formatCurrency(currentBid.amount) : 0}</MediumText>
        </div>
        <SecondaryText active={loaded} --color="#7A7A7A" --font-family="Poppins" --font-weight="500" --text-transform="normal">{formatRemainingTime(remainingTime, "other")} left</SecondaryText>
    </div>
</a>

<style lang=scss>
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: var(--width, 300px);
    overflow: hidden;
    border-radius: $btn-border-radius-normal $btn-border-radius-normal 0 0;

    &:hover {
        .display img {
            scale: $transition-scale;
        }
    }
}

.card.lines {
    flex-direction: row;
    gap: 30px;
    justify-content: center;
    border-radius: $btn-border-radius-normal 0 0 $btn-border-radius-normal;

    .display {
        flex: 1;
        width: 350px;
        
        img {
            border-radius: $btn-border-radius-normal 0 0 $btn-border-radius-normal;
        }
    }

    .text { 
        flex: 1;
        justify-content: space-between;

        div {
            margin-top: auto;
        }
    }
}

.favorite {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
}

.display {
    overflow: hidden;
    height: 350px;

    img {
        object-fit: cover;
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

@media(max-width: $screen-medium) {
    .card.lines {
        flex-direction: column;
        justify-content: normal;
        gap: 4px;
        border-radius: $btn-border-radius-normal $btn-border-radius-normal 0 0;

        .display {
            width: 100%;

            img {
                height: 350px;
                border-radius: $btn-border-radius-normal $btn-border-radius-normal 0 0;
            }
        }

        .text { 
            flex: 0;
        }
    }
}
</style>