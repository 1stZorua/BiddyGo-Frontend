<script lang=ts>
	import type { SubCategory, Category, AuctionListings } from "$lib/types/types";
    import { Categories, ListingSlider } from "../../../components/index.ts";
	import { afterNavigate } from "$app/navigation";

    export let data: {
        category: Category,
        subCategories: SubCategory[]
        auctionListings: AuctionListings[]
    };

    let loaded: boolean = false;

    afterNavigate(() => loaded = true); 
</script>

<Categories 
    active={loaded}
    category={data.category}
    subCategories={data.subCategories}
></Categories>
{#if loaded}
    {#each data.subCategories as subCategory, index}
        <ListingSlider {subCategory} auctionListings={data.auctionListings[index].data}></ListingSlider>
    {/each}
{:else}
    {#each Array(3) as _}
        <ListingSlider active={loaded}></ListingSlider>
    {/each}
{/if}