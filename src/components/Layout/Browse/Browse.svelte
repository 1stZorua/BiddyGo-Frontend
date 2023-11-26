<script lang=ts>
    import { Heading, Slider, SmallText } from "../../index.ts";
	import type { Category } from "$lib/types/types.ts";
    import Card from "./Card.svelte";

    export let categories: Category[] = [];
</script>

<section id="browse" class="browse">
    <div>
        <div class="text">
            <Heading>Browse By Categories</Heading>
            <p>Explore our diverse range of categories to find the perfect treasures that match your interests and preferences.</p>
        </div>
        <Slider --margin-top="25px">
            {#each categories as category}
                <Card link="/c/{category.id}">
                    <SmallText 
                        --font-weight="semibold" 
                        --color="#efefef"
                    >{category.name}</SmallText>
                </Card>
            {/each}
        </Slider>
    </div>
</section>

<style lang=scss>
    .browse {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        text-align: center;
        height: $section-height-small;

        .text {
            margin-top: -10px;
        }

        &::before {
            content: '';
            position: absolute;
            background: $section-light;
            width: 100%;
            height: calc($section-height-small + $wrapper-gap * 2);
            left: 0;
            z-index: -1;
        }

        > div {
            position: relative;
            height: 250px;
            width: 100%;
        }
    }
</style>