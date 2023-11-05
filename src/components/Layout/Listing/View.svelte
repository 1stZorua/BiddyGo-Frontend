<script lang=ts>
    import { page } from "$app/stores";
	import { onDestroy, onMount } from "svelte";
    import { scale } from "svelte/transition";
    import { fetchMultipleRequests, useSignalRHub, formatCurrency } from "$lib/functions/index.ts";
	import type { AuctionListing, Bid, Image } from "$lib/types/types.ts";
	import { defaultAuctionListing, defaultBid } from "$lib/types/defaults.ts";
    import { fullscreenGallery, connectToHub, disconnectFromHub, isPageModalOpen, invokeHubMethod } from "../../../stores/index.ts"
    import { Heading, SecondaryText, Subheading, FilterButton, PrimaryButton, FullScreenGallery, Gallery, MobileGallery, Path, Subtitle, MediumText, SmallText, BidForm, PageModal, Tablist, BidHistory } from "../../index.ts";

    let loaded: boolean = false;
    let auctionListing: AuctionListing = defaultAuctionListing;
    let auctionListingImages: Image[] = [];
    let currentBid: Bid = defaultBid;
    let bidHistory: Bid[] = [];

    let activeTab = 0;

    const { categoryId, subCategoryId } = $page.params;

    export let auctionListingId: string;

    $: currentBid.formatted_amount = formatCurrency(currentBid.amount);
    
    onMount(async () => {
        connectToHub(await useSignalRHub<number>("https://localhost:32768/auction-hub", "NewBid", (data) => currentBid.amount = data));
        invokeHubMethod("JoinGroup", `auction_${auctionListingId}`)
        console.log(currentBid);
        const [auctionResponse, imagesResponse, bidResponse, bidHistoryResponse] = await fetchMultipleRequests(
            [
                { url: `/api/AuctionListing/${auctionListingId}`, method: "GET" },
                { url: `/api/AuctionListing/images/${auctionListingId}`, method: "GET" },
                { url: `/api/Bid/highest/${auctionListingId}`, method: "GET" },
                { url: `/api/Bid/${auctionListingId}`, method: "GET" }
            ]
        );

        [auctionListing, auctionListingImages, currentBid, bidHistory] = [auctionResponse as AuctionListing, imagesResponse as Image[], bidResponse as Bid, bidHistoryResponse as Bid[]]
        loaded = true;
    });

    onDestroy(() => {
        disconnectFromHub();
    })
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
            images={auctionListingImages}
        ></Gallery>
        <MobileGallery 
            active={loaded}
            images={auctionListingImages}
        ></MobileGallery>
        {#if $fullscreenGallery}
            <FullScreenGallery images={auctionListingImages}></FullScreenGallery>
        {/if}
        <div class="text">
            <div>
                <Subtitle active={loaded} --line-color="white" --screen-wide-color="black">NR. {auctionListing.id}</Subtitle>
                <Subheading active={loaded} --color="white" --screen-wide-color="black" --font-weight="500">{auctionListing.title}</Subheading>
            </div>
            <div data-active={loaded} class="time-remaining">
                {#if loaded}
                    {#each Array(["1", "Days"], ["9", "Hours"], ["24", "Minutes"], ["17", "Seconds"],) as time}
                        <div>
                            <MediumText --color="#7A7A7A" --font-weight="700">{time[0]}</MediumText>
                            <SmallText --font-weight="600">{time[1]}</SmallText>
                        </div>
                    {/each}
                {/if}
            </div>
            <div class="current-bid">
                <SecondaryText active={loaded}>Current Bid</SecondaryText>
                <Heading active={loaded}>&euro; {currentBid.formatted_amount}</Heading>
            </div>
            <div class="form">
                <BidForm active={loaded} currentBid={currentBid}></BidForm>
            </div>
        </div>
    </div>
    <Tablist
        active={loaded}
        sections={Array("Description", "Shipping", "Bid History", "Seller Information")}
    >
        <div>
            <Subheading active={loaded} --font-weight="500">{auctionListing.description}</Subheading>
        </div>
        <div class="hidden">
            <Subheading --font-weight="500">Shipping</Subheading>
        </div>
        <div class="hidden">
            <BidHistory bids={bidHistory}></BidHistory>
        </div>
        <div class="hidden">
            <Subheading --font-weight="500">Seller Information</Subheading>
        </div>
    </Tablist>
    <div class="auction-bar">
        <div>
            <SecondaryText active={loaded}>Current Bid</SecondaryText>
            <Heading active={loaded}>&euro; {currentBid.formatted_amount}</Heading>
            <SmallText active={loaded}>1d 9u 24m 17s</SmallText>
        </div>
        <PrimaryButton active={loaded} --primary="white" --secondary="black" onClick={() => isPageModalOpen.set(true)}>Place Bid</PrimaryButton>
    </div>
    {#if $isPageModalOpen}
        <PageModal currentBid={currentBid} bidHistory={bidHistory} thumbnailImage={auctionListingImages[0]}></PageModal>
    {/if}
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