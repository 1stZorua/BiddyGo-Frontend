<script lang=ts>
    import { page } from "$app/stores";
    import { formatCurrency, formatRemainingTime } from "$lib/functions/index.ts";
    import { fullscreenGallery } from "../../../stores/index.ts"
    import { Heading, SecondaryText, Subheading, PrimaryButton, FullScreenGallery, Gallery, MobileGallery, Path, Subtitle, MediumText, SmallText, BidForm, PageModal, Tablist, BidHistory } from "../../index.ts";
    import type { ViewData } from "$lib/types/types.ts";
    import { isPageModalOpen } from "../../../stores/index.ts";

    export let loaded : boolean;
    export let data : ViewData;

    const { auctionListingId, categoryId, subCategoryId } = $page.params;

    $: data.currentBid.formatted_amount = formatCurrency(data.currentBid.amount) 
</script>

<section class="view">
    <Path 
        active={loaded} 
        categories={
            loaded 
            ? [categoryId, subCategoryId, auctionListingId, "Auction Listing"]
            : ["BiddyGo > Entertainment, Cards & Games > Pokemon & Trading Cards"]
        }>
    </Path>
    <div class="listing">
        <Gallery 
            active={loaded} 
            images={data.auctionListingImages}
        ></Gallery>
        <MobileGallery 
            active={loaded}
            images={data.auctionListingImages}
        ></MobileGallery>
        {#if $fullscreenGallery}
            <FullScreenGallery images={data.auctionListingImages}></FullScreenGallery>
        {/if}
        <div class="text">
            <div>
                <Subtitle active={loaded} --line-color="white" --screen-wide-color="black">NR. {data.auctionListing.id}</Subtitle>
                <Subheading active={loaded} --color="white" --screen-wide-color="black" --font-weight="500">{data.auctionListing.title}</Subheading>
            </div>
            <div data-active={loaded} class="time-remaining">
                {#if loaded}
                    {#each Object.entries(data.remainingTime) as [key, value]}
                        <div>
                            <MediumText --color="#7A7A7A" --font-weight="700">{value}</MediumText>
                            <SmallText --font-weight="600">{key}</SmallText>
                        </div>
                    {/each}
                {/if}
            </div>
            <div class="current-bid">
                <SecondaryText active={loaded}>Current Bid</SecondaryText>
                <Heading active={loaded}>&euro; {data.currentBid.formatted_amount}</Heading>
            </div>
            <div class="form">
                <BidForm active={loaded} {...data} auctionListingId={Number(auctionListingId)}></BidForm>
            </div>
        </div>
    </div>
    <Tablist
        active={loaded}
        sections={Array("Description", "Shipping", "Bid History", "Seller Information")}
    >
        <div>
            <Subheading active={loaded} --font-weight="500">{data.auctionListing.description}</Subheading>
        </div>
        <div class="hidden">
            <Subheading --font-weight="500">Shipping</Subheading>
        </div>
        <div class="hidden">
            <BidHistory bids={data.bidHistory}></BidHistory>
        </div>
        <div class="hidden">
            <Subheading --font-weight="500">Seller Information</Subheading>
        </div>
    </Tablist>
    <div class="auction-bar">
        <div>
            <SecondaryText active={loaded}>Current Bid</SecondaryText>
            <Heading active={loaded}>&euro; {data.currentBid.formatted_amount}</Heading>
            <SmallText active={loaded}>{formatRemainingTime(data.remainingTime)}</SmallText>
        </div>
        <PrimaryButton active={loaded} --color="white" --background-color="black" onClick={() => isPageModalOpen.set(true)}>Place Bid</PrimaryButton>
    </div>
</section>

<style lang=scss>
    .view {
        display: flex;
        flex-direction: column;
        gap: 100px;
    }

    .listing {
        display: flex;
        justify-content: space-between;
        gap: 100px;
        margin-top: -50px;
    }

    .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &::before {
            content: '';
            position: absolute;
            background: $section-light;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 400px;
            margin-top: -25px;
        }
    }

    .time-remaining{
        display: flex;
        justify-content: space-between;
        height: 140px;
        max-width: 550px;
        background: $secondary;
        border-radius: $btn-border-radius-large 0 $btn-border-radius-large 0;
        padding: 30px;

        div {
            display: grid;
            place-items: center;
            width: max-content;
        }
    }

    .time-remaining[data-active="false"] {
        background: $skeleton-background-color;
        background-size: 200% 100%; 
        animation: $skeleton-animation;
        border: none;
    }

    .auction-bar {
        display: none;
        align-items: center;
        justify-content: space-between;
        padding-block: 12.5px;
        padding-inline: $wrapper-margin-inline-small;
        border-top: 2px solid $gray-regular;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 10;
        background: $secondary;
        width: 100%;
    }

    @media (max-width: $screen-wide) {
        .listing {
            flex-direction: column;
        }

        .text {
            gap: 50px;

            > *:not(:first-child), &::before {
                display: none;
            }
        }

        .form {
            display: none;
        }

        .auction-bar {
            display: flex;
        }
    }

    @media (max-width: $screen-large) {
        .view {
            gap: 50px;
        }
        
        .listing {
            gap: 50px;
            margin-top: 0;
        }
    }
</style>