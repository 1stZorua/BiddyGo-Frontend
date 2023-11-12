<script lang=ts>
	import { onMount } from "svelte";
    import { sendRequest } from "$lib/functions/index.ts";
	import type { AuctionListing, SubCategory } from "$lib/types/types";
	import { defaultSubCategory } from "$lib/types/defaults.ts";
    import { Subheading, TertiaryButton, Slider } from "../../index.ts";
	import Card from "./Card.svelte";

    export let active: boolean = true;
    export let subCategory : SubCategory = defaultSubCategory;

    let auctionListings : Array<AuctionListing> = []
    let loaded: boolean = false;

    onMount(async() => {
        if (!active) return;
        auctionListings = await sendRequest(`/api/AuctionListing/subcategories/${subCategory.id}`, "GET");
        loaded = true;
    });
</script>

{#if loaded} 
    {#if auctionListings.length > 0}
        <section class="slider" id={subCategory.name}>
            <div class="separator">
                <Subheading>{subCategory.name}</Subheading>
                <TertiaryButton>View All</TertiaryButton>
            </div>
            <Slider --position="absolute" --margin-top="120px">
                {#each auctionListings as auctionListing}
                    <div>
                        <Card auctionListing={auctionListing}></Card>
                    </div>
                {/each}
            </Slider>
        </section>
    {/if}
{:else}
    <section class="slider">
        <div class="separator">
            <Subheading active={loaded}>{subCategory.name}s</Subheading>
            <TertiaryButton active={loaded}>View All</TertiaryButton>
        </div>
        <Slider --position="absolute" --margin-top="120px">
            {#each Array(10) as _}
                <div>
                    <Card active={loaded}></Card>
                </div>
            {/each}
        </Slider>
    </section>
{/if}

<style lang=scss> 
    .slider {
        display: flex;
        flex-direction: column;
        gap: $section-text-gap;
        height: 700px;
    }

    .separator {
        display: flex;
        justify-content: space-between;
    }

    @media(max-width: $screen-extraLarge) { 
        .separator {
            flex-direction: column;
        }
    }
</style>