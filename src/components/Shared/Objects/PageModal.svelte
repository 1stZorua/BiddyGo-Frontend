<script lang=ts>
    import type { AuctionListing, Bid, Image, RemainingTime } from "$lib/types/types.ts";
    import { formatRemainingTime } from "$lib/functions/index.ts";
    import { isPageModalOpen, fullscreenGallery, activeIndex } from "../../../stores/index.ts";
	import { Heading, MediumText, SecondaryText, BidForm, BidHistory } from "../../index.ts";
    import type { SuperValidated } from "sveltekit-superforms";
    import type { BidSchema } from "$lib/schemas/bid.ts";

    export let auctionListing: AuctionListing;
    export let currentBid: Bid;
    export let bidHistory: Bid[];
    export let thumbnailImage: Image;
    export let remainingTime: RemainingTime;
    export let formData: SuperValidated<BidSchema>;
    export let bidText: string;

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
        <MediumText><b>Closes in</b> {formatRemainingTime(remainingTime)}</MediumText>
    </div>
    <div class="wrapper">
        <div class="listing">
            <button on:click={() => openFullScreenGallery(0)}>
                <img src={"data:image/jpeg;base64," + thumbnailImage?.fileContents} alt="placeholder">
            </button>
            <div class="content">
                <div class="info">
                    <SecondaryText --color={bidText.includes("You") ? "#57C5B6" : "#7A7A7A"}>{bidText}</SecondaryText>
                    <Heading>&euro; {currentBid.formatted_amount}</Heading>
                </div>
                <BidForm --form-width="100%" --button-gap="10px" auctionListingId={auctionListing.id} {currentBid} {formData} {remainingTime} pageModal={true}></BidForm>
            </div>
        </div>
        <BidHistory bids={bidHistory}></BidHistory>
    </div>
</div>


<style lang=scss>
    .page__modal {  
        display: none;   
        position: fixed;
        top: 0;
        left: 0;
        z-index: 30;
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
        z-index: 40;
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
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-top: 110px;
        padding: $wrapper-margin-inline-normal;
    }

    .listing {
        display: flex;
        gap: 30px;

        button {
            width: 550px;
            height: 400px;
            background: none;
            border: none;

            &:hover {
                cursor: pointer;
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 50px;
    }

    @media (max-width: $screen-wide) {
        .page__modal {
            display: block;
        }
    }

    @media (max-width: $screen-extraLarge) {
        .listing {
            flex-direction: column;

            button {
                width: 100%;
                max-height: 450px;
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

    @media (max-width: $screen-small) {
        .listing button {
            max-height: 250px;
        }
    }
</style>