<script lang=ts>
    import type { Category, SubCategory } from "$lib/types/types.ts";
    import { Heading, Path } from "../../index.ts";
    import Card from "./Card.svelte";

    export let active: boolean;
    export let category: Category;
    export let subCategories: SubCategory[];
</script>

{#if active}
    <section class="categories">
        <div class="text">
            <Path categories={[category.name]}></Path>
            <Heading>{category.name}</Heading>
        </div>
        <div class="container">
            {#each subCategories as subCategory}
                <Card subCategory={subCategory}></Card>
            {/each}
        </div>
    </section>
{:else}
    <section class="categories">
        <div class="text">
            <Path active={active} categories={["BiddyGo > Entertainment, Cards & Games"]}></Path>
            <Heading active={active}>Entertainment, Cards & Games</Heading>
        </div>
        <div class="container">
            {#each Array(3) as _}
                <Card active={active}></Card>
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