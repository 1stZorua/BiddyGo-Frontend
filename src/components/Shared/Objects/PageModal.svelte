<script lang=ts>
    import type { Bid, Image } from "$lib/types/types.ts";
	import { defaultBid } from "$lib/types/defaults.ts";
    import { isPageModalOpen, fullscreenGallery, activeIndex } from "../../../stores/index.ts";
	import { Heading, MediumText, SecondaryText, BidForm, BidHistory } from "../../index.ts";

    export let auctionListingId: number;
    export let currentBid: Bid = defaultBid;
    export let bidHistory: Bid[] = []
    export let thumbnailImage: Image;

    function openFullScreenGallery(index: number) {
        activeIndex.set(index);
        fullscreenGallery.set(true)
    }
</script>

<div 
    class="page__modal" 
>
    <div class="header">
        <button on:click={() => isPageModalOpen.set(false)}><i class="fa-solid fa-chevron-left"></i></button>
        <MediumText><b>Closes in</b> 7h 47m 20s</MediumText>
    </div>
    <div class="wrapper">
        <div class="listing">
            <button on:click={() => openFullScreenGallery(0)}>
                <img src={"data:image/jpeg;base64," + thumbnailImage?.fileContents} alt="placeholder">
            </button>
            <div class="content">
                <div class="info">
                    <SecondaryText>Current bid</SecondaryText>
                    <Heading>&euro; {currentBid.formatted_amount}</Heading>
                </div>
                <BidForm --form-width="100%" --button-gap="10px" auctionListingId={Number(auctionListingId)} currentBid={currentBid}></BidForm>
            </div>
            <BidHistory bids={bidHistory}></BidHistory>
        </div>
    </div>
</div>


<style lang=scss>
    .page__modal {  
        display: none;   
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        background: $secondary;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .header {
        position: fixed;
        background: $secondary;
        width: 100%;
        display: flex;
        justify-content: center;
        border-bottom: $btn-border-size solid $accent-secondary;
        padding-block: $wrapper-margin-bottom;
    }

    .header button {
        display: flex;
        align-self: center;
        position: absolute;
        left: $wrapper-margin-inline-normal;
        background: none;
        border: none;
        color: $accent-secondary;
        transition:
            color $transition-fast;

        &:hover {
            cursor: pointer;
            color: $accent-primary;
        }
    }

    .wrapper {
        margin-top: 110px;
        padding: $wrapper-margin-inline-normal;
    }

    .listing {
        display: flex;
        justify-content: center;
        gap: 30px;

        button {
            background: none;
            border: none;

            &:hover {
                cursor: pointer;
            }
        }

        img {
            width: 100%;
            max-width: 750px;
            max-height: 450px;
            object-fit: cover;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 30px;
    }

    @media (max-width: $screen-wide) {
        .page__modal {
            display: block;
        }
    }

    @media (max-width: $screen-extraLarge) {
        .listing {
            flex-direction: column;

            img {
                max-width: 100%;
            }
        } 
    }

    @media (max-width: $screen-medium) {
        .header button {
            left: $wrapper-margin-inline-small;
        }
        
        .wrapper {
            margin-top: 80px;
            padding-inline: $wrapper-margin-inline-small;
        }
    }
</style>