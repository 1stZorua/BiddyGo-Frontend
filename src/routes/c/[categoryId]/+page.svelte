<script lang=ts>
    import { page } from "$app/stores";
	import { onMount } from "svelte";
    import { sendRequest } from "$lib/functions/index.ts";
	import type { SubCategory } from "$lib/types/types";
    import { Categories, ListingSlider } from "../../../components/index.ts";

    const categoryId: string = $page.params.categoryId;

    let subCategories: Array<SubCategory> = [];
    let loaded: boolean = false;
    
    onMount(async() => {
        subCategories = await sendRequest(`/api/Category/subcategories/${categoryId}`, "GET");
        loaded = true;
    });
    
</script>

<Categories categoryId={categoryId}></Categories>
{#if loaded}
    {#each subCategories as subCategory}
        <ListingSlider subCategory={subCategory}></ListingSlider>
    {/each}
{:else}
    {#each Array(3) as _}
        <ListingSlider active={loaded}></ListingSlider>
    {/each}
{/if}