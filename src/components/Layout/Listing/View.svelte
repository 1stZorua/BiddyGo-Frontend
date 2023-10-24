<script lang=ts>
    import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { sendRequest } from "$lib/functions/request";
    import { fullscreenGallery } from "../../../stores/galleryStore.ts";
	import type { AuctionListing, Image } from "$lib/types/types.ts";
    import { Heading, SecondaryText, Subheading, FilterButton, OptionButton, PrimaryButton, Input, FullScreenGallery, Gallery, MobileGallery, Path, Subtitle, MediumText, SmallText } from "../../index.ts";

    let auctionListing: AuctionListing = {
        id: 0,
        subCategoryId: 0,
        title: "The Pokemon Company Mystery box - Blastoise",
        description: "placeholder",
        startingBid: 20,
        reservePrice: 0,
        startTime: new Date('2023-07-11T00:00:00'),
        endTime: new Date('2023-07-11T00:00:00'),
        sellerId: 0
    };
    let auctionListingImages: Array<Image> = [];
    let loaded: boolean = false;
    
    let activeButton: number = 1;
    let tablistContent: HTMLDivElement;

    const { categoryId, subCategoryId } = $page.params;

    function onTabClick(index: number) {
        activeButton = index;
        tablistContent.querySelector(".active")?.classList.remove("active");
        [...tablistContent.children][index - 1].classList.add("active"); 
    }
    
    export let auctionListingId: string;
    
    onMount(async () => {
        auctionListing = await sendRequest(`/api/AuctionListing/${auctionListingId}`, "GET");
        auctionListingImages = await sendRequest(`/api/AuctionListing/images/${auctionListingId}`, "GET");
        loaded = true;
    });
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
                <Subtitle active={loaded}>NR. {auctionListing.id}</Subtitle>
                <Subheading active={loaded}>{auctionListing.title}</Subheading>
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
                <Heading active={loaded}>&euro; 289</Heading>
            </div>
            <form>
                <Input active={loaded} inputType={"number"} min={299} name={"bidValue"} placeholder="&euro; 299 or up"></Input>
                <div>
                    <OptionButton active={loaded}>&euro; 299</OptionButton>
                    <OptionButton active={loaded}>&euro; 309</OptionButton>
                    <PrimaryButton active={loaded} --primary="white" --secondary="black">Place Bid</PrimaryButton>
                </div>
            </form>
        </div>
    </div>
    <div class="information">
        <div class="tablist">
            {#each Array("Description", "Shipping", "Bidding History", "Seller Information") as tab, index}
                <FilterButton active={loaded} activeButton={activeButton} number={index + 1} onClick={onTabClick}>{tab}</FilterButton>
            {/each}
        </div>
        <div 
            class="content" 
            bind:this={tablistContent}
        >
            {#each Array(auctionListing.description, "Shipping", "Bidding History", "Seller Information") as content, index}
                <div class={index === 0 ? "active" : ""}>
                    <Subheading active={loaded}>{content}</Subheading>
                </div>
            {/each}
        </div>
    </div>
    <div class="auction-bar">
        <div>
            <SecondaryText active={loaded}>Current Bid</SecondaryText>
            <Heading active={loaded}>&euro; 289</Heading>
            <SmallText active={loaded}>1d 9u 24m 17s</SmallText>
        </div>
        <PrimaryButton active={loaded} --primary="white" --secondary="black">Place Bid</PrimaryButton>
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
    }

    .time-remaining{
        display: flex;
        justify-content: space-between;
        height: 140px;
        max-width: 550px;
        background: $secondary;
        border: $btn-option-border;
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

    form {
        display: flex;
        flex-direction: column;
        gap: $btn-gap;
        max-width: 550px;

        div {
            display: flex;
            justify-content: space-between;
        }
    }

    .information {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .tablist {
        display: flex;
        flex-wrap: wrap;
        gap: $btn-gap;
    }

    .content div {
        display: none;
    }

    .content div.active {
        display: block;
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

            > *:not(:first-child) {
                display: none;
            }
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