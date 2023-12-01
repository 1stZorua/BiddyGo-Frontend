<script lang=ts>
    import { MediumText, SecondaryText, Square } from "../../index.ts";
    import type { AuctionListing, Bid, Image, SubCategory } from "$lib/types/types.ts";
    import comic from "$lib/img/comic.png";
	import { onMount } from "svelte";
	import { fetchMultipleRequests, formatCurrency } from "$lib/functions/index.ts";
	import { defaultBid, defaultSubCategory } from "$lib/types/defaults.ts";

    export let auctionListing: AuctionListing;

    let loaded: boolean = false;
    let thumbnailImage: Image;
    let subCategory: SubCategory = defaultSubCategory;
    let currentBid: Bid = defaultBid;

    onMount(async () => {
        const [thumbnailResponse, subCategoryResponse, currentBidResponse] = await fetchMultipleRequests(
            [
                { url: `/api/AuctionListing/thumbnail/${auctionListing.id}`, method: "GET" },
                { url: `/api/SubCategory/${auctionListing.subCategoryId}`, method: "GET" },
                { url: `/api/Bid/highest/${auctionListing.id}`, method: "GET" }
            ]
        );

        [thumbnailImage, subCategory, currentBid] = [thumbnailResponse as Image, subCategoryResponse as SubCategory, currentBidResponse as Bid];

        loaded = true;
    })
</script>

<div class="slider-container">
    <div class="slider">
        <div class="item">
            {#if thumbnailImage}
                <img src={"data:image/jpeg;base64," + thumbnailImage?.fileContents} alt={auctionListing.title}>
            {:else}
                <div></div>
            {/if}
        </div>
    </div>
    <div class="square-container">
        <div class="element">
            <a href={loaded ? `/c/${subCategory.categoryId}/${subCategory.id}/${auctionListing.id}` : ""}>
                <i class="fa-solid fa-globe"></i>
            </a>
            <div class="square"></div>
        </div>
        <div class="element"><Square --size="200px" --background="#1A5F7A" --radius="30px"></Square></div>
        <div class="element"><Square --size="100px" --background="#002B5B" --radius="20px"></Square></div>
        <div class="element">
            <div class="square">
                {#if loaded}
                    <SecondaryText active={loaded} --color="white" --background="transparent">Current bid</SecondaryText>
                    <div>
                        <MediumText active={loaded} --color="white" --background="transparent">&euro;{formatCurrency(currentBid.amount)}</MediumText>
                    </div>
                {:else}
                    <i class="fa-solid fa-circle-notch fa-spin"></i>
                {/if}
            </div>
        </div>
    </div>
</div>

<style lang=scss>
    .slider-container {
        width: 500px;
        height: 650px;
        overflow: hidden;
    }

    .slider {
        height: 100%;
    }
    
    .slider .item {
        height: 100%;
        position: relative;

        img {
            width: 500px;
            height: 650px;
            border-radius: $btn-border-radius-full; 
            object-fit: cover;
        }

        div {
            width: 500px;
            height: 650px;
            background: var(--background, $skeleton-background-color);
            background-size: 200% 100%; 
            animation: $skeleton-animation; 
            border-radius: $btn-border-radius-full; 
        }
    }

    .square-container .element {
        position: absolute;
        width: max-content;

        &:first-child {
            display: grid;
            place-items: center;
            right: -100px;
            top: 10px;

            .square {
                width: 125px;
                height: 125px;
                background: $accent-primary;
                border-radius: $btn-border-radius-small;
            }

            a {
                position: absolute;
            }
            
            i {
                color: $icon-accent-primary;
                font-size: $font-size-heading;
                transition: 
                    color $transition-fast;

                &:hover {
                    cursor: pointer;
                    color: $icon-secondary;
                }
            }
        }

        &:nth-child(2) {
            bottom: -100px;
            right: -100px;
            z-index: -1;
        }

        &:nth-child(3) {
            bottom: -150px;
            right: 200px;
        }

        &:last-child {
            bottom: -75px;
            right: 360px;

            .square {
                display: grid;
                place-content: center;
                text-align: center;
                background: $accent-secondary;
                height: 250px;
                width: 250px;
                border-radius: $btn-border-radius-large;
            }

            i {
                color: $btn-secondary;
            }
        }
    } 

    @media (max-width: $screen-wide) {
        .slider-container {
            width: 100%;
        }

        .slider .item {
            background: $gray-light;
            border-radius: $btn-border-radius-large;

            img, div {
                border-radius: $btn-border-radius-rounded;
                width: 100%;
                height: 100%;
                object-fit: scale-down;
            }
            
        }

        .square-container .element {
            &:first-child {
                top: 10px;
                right: -20px;
            }

            &:nth-child(2), &:nth-child(3) {
                display: none;
            }

            &:last-child {
                left: -20px;
                bottom: -20px;
            }
        }
    }

    @media(max-width: $screen-medium) {
        .slider .item {
            background: none;
            
            img {
                object-fit: cover;
            }
        }

        .square-container .element {
            &:first-child {
                top: 0;
                right: 0;
                .square {
                    border-radius: 0 $btn-border-radius-large 0 $btn-border-radius-large;
                }
            }

            &:last-child {
                width: 100%;
                bottom: 0;
                left: 0;
                .square {
                    height: 150px;
                    width: 100%;
                    border-radius: 0 0 $btn-border-radius-large $btn-border-radius-large;
                }
            }
        }
    }

    @media(max-width: $screen-small) {
        .slider-container {
            height: 400px;
        }

        .square-container .element {
            &:first-child {
                display: none;
            }

            &:last-child .square {
                height: 100px;
            }
        }
    }
</style>