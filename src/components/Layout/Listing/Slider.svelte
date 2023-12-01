<script lang=ts>
	import type { AuctionListing, SubCategory } from "$lib/types/types";
	import { defaultSubCategory } from "$lib/types/defaults.ts";
    import { Subheading, TertiaryButton, Slider } from "../../index.ts";
	import Card from "./Card.svelte";

    export let active: boolean = true;
    export let subCategory: SubCategory = defaultSubCategory;
    export let auctionListings: AuctionListing[] = [];
</script>

{#if active}
    {#if auctionListings.length > 0}
        <section class="slider" id={subCategory.name}>
            <div class="separator">
                <Subheading>{subCategory.name}</Subheading>
                <TertiaryButton link="/c/{subCategory.categoryId}/{subCategory.id}">View All</TertiaryButton>
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
            <Subheading active={active}>{subCategory.name}s</Subheading>
            <TertiaryButton active={active}>View All</TertiaryButton>
        </div>
        <Slider --position="absolute" --margin-top="120px">
            {#each Array(10) as _}
                <div>
                    <Card active={active}></Card>
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