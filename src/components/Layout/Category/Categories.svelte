<script lang=ts>
    import { onMount } from "svelte";
    import { fetchMultipleRequests } from "$lib/functions/index.ts";
    import type { Category, SubCategory } from "$lib/types/types.ts";
    import { Heading, Path } from "../../index.ts";
    import Card from "./Card.svelte";

    export let categoryId: string;

    let category: Category;
    let subcategories: SubCategory[] = []
    let loaded: boolean = false;

    onMount(async () => {
        const [categoryResponse, subcategoriesResponse] = await fetchMultipleRequests(
            [
                { url: `/api/Category/${categoryId}`, method: "GET" },
                { url: `/api/Category/subcategories/${categoryId}`, method: "GET" }
            ]
        );
        [category, subcategories] = [categoryResponse as Category, subcategoriesResponse as SubCategory[]];
        loaded = true;
    });
</script>

{#if loaded}
    <section class="categories">
        <div class="text">
            <Path categories={[category.name]}></Path>
            <Heading>{category.name}</Heading>
        </div>
        <div class="container">
            {#each subcategories as subcategory}
                <Card subCategoryData={
                    {
                        imageId: subcategory.imageId, 
                        name: subcategory.name
                    }
                }></Card>
            {/each}
        </div>
    </section>
{:else}
    <section class="categories">
        <div class="text">
            <Path active={loaded} categories={["BiddyGo > Entertainment, Cards & Games"]}></Path>
            <Heading active={loaded}>Entertainment, Cards & Games</Heading>
        </div>
        <div class="container">
            {#each Array(3) as _}
                <Card active={loaded}></Card>
            {/each}
        </div>
    </section>
{/if}

<style lang=scss>
    .categories {
        display: flex;
        flex-direction: column;
        gap: $section-text-gap;
    }

    .container {
        width: 100%;
        height: max-content;
        display: flex;
        flex-wrap: wrap;
        gap: 100px;
    }

    @media(max-width: $screen-extraLarge) {
        .container {
            gap: 50px;
        }
     }
</style>