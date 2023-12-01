<script lang=ts>
    import { fullscreenGallery, activeIndex, hubConnection } from "../../../stores/index.ts"
	import type { Image, Favorite } from "$lib/types/types.ts";
    import { FavoriteButton, SmallText, ZoomImage } from "../../index.ts";
    import { page } from "$app/stores";
    import { getFlash } from "sveltekit-flash-message/client";
	import { addFavorite, sendRequest } from "$lib/functions/index.ts";

    const flash = getFlash(page);

    export let active: boolean = true;
    export let images: Array<Image>;
    export let favorites: number[];
    export let isFavorited: boolean;
    export let auctionListingId: number | undefined;

    let activeImageIndex: number = 0;
    let previousActiveIndex: number = 0;
    

    function onMouseClick(index: number) {
        activeImageIndex = index;
        previousActiveIndex = index;
    }

    function onMouseEnter(index: number) {
        activeImageIndex = index;
    }

    function onMouseLeave() {
        activeImageIndex = previousActiveIndex;
    }

    function openFullScreenGallery() {
        activeIndex.set(activeImageIndex);
        fullscreenGallery.set(true)
    }

    async function onFavorite() {
        if (!$page.data.user) {
            flash.set({type: "error", message: "You need to be logged in to favorite an auction listing."});
            return;
        }

        const favorite: Favorite = {
            auctionListingId: auctionListingId,
            userId: Number($page.data.user.id)
        }

        let remove: boolean = false;

        if (favorites.includes(favorite.userId)) {
            remove = true
        }

        isFavorited = favorites.includes(favorite.userId);
        favorites.length = favorites.length;

        await sendRequest(`/api/Favorite`, "POST", favorite);
        await addFavorite($hubConnection, favorite.userId, favorite.auctionListingId, favorites.includes(favorite.userId));
    }
</script>

{#if active}
    <div class="image-container">
        <button class="favorite" on:click|preventDefault>
            <FavoriteButton 
                isFavorited={isFavorited}
                onClick={onFavorite}
            >
                <SmallText --height="max-content">{favorites.length}</SmallText>
            </FavoriteButton>
        </button>
        <div class="preview-container">
            <ZoomImage src={"data:image/jpeg;base64," + images[activeImageIndex]?.fileContents}></ZoomImage>
        </div>
        <div class="images">
            {#each images.slice(0, 2) as image, index}
                <button 
                    on:click={() => onMouseClick(index)}
                    on:mouseenter={() => onMouseEnter(index)}
                    on:mouseleave={onMouseLeave}
                >
                    <img class={(activeImageIndex === index) ? "active" : ""}
                        src={"data:image/jpeg;base64," + image?.fileContents}
                        alt="placeholder"
                    >
                </button>
            {/each}
            <button 
                class="more" 
                data-length={images.length - 2}
                on:click={openFullScreenGallery}
            >
                <img src={"data:image/jpeg;base64," + images[images.length - 1]?.fileContents} alt="test">
            </button>
        </div>
    </div>
{:else}
    <div class="image-container">
        <div class="preview-container">
            <div></div>
        </div>
        <div class="images">
            {#each Array(2) as _}
                <div></div>
            {/each}
            <div></div>
        </div>
    </div>
{/if}

<style lang=scss>
    .image-container {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 30px;
        height: max-content;
        width: max-content;

        button {
            background: none;
            border: none;
            height: 180px;

            &:hover {
                cursor: pointer;
            }
        }

        img {
            object-fit: cover;
            border-radius: $btn-border-radius-normal;
            outline: $btn-border-size solid $secondary;
            transition: 
                outline-color $transition-fast;
        }

        img.active {
            outline: $btn-border-size solid $accent-secondary;
        }
    }

    .favorite {
        position: absolute;
        top: -50px;
        left: 10px;
        z-index: 10;
    }

    .preview-container {
        position: relative;
        width: 600px;
        height: 500px;

        div {
            background: $skeleton-background-color;
            background-size: 200% 100%; 
            animation: $skeleton-animation;
            width: 100%;
            height: 100%;
            border-radius: $btn-border-radius-normal;
        }
    }

    .images {
        display: flex;
        justify-content: space-between;

        img, div {
            width: 180px;
            height: 180px;
        }

        div {
            background: $skeleton-background-color;
            background-size: 200% 100%; 
            animation: $skeleton-animation;
            border-radius: $btn-border-radius-normal;
        }
    }

    .images .more {
        position: relative;
        height: 180px;
        
        &::before {
            display: grid;
            place-items: center;
            color: $secondary;
            font-size: $font-size-medium;
            content: '+' attr(data-length);
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.8;
            background: $accent-tertiary;
            border-radius: $btn-border-radius-normal;
        }
    }

    @media (max-width: $screen-wide) {
        .image-container {
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            gap: 30px;

            .preview-container {
                width: 100%;
                height: 600px;
            }
        }

        .images {
            flex-direction: column;
        }
    }

    @media (max-width: $screen-large) {
        .image-container {
            display: none;
        }
    }
</style>