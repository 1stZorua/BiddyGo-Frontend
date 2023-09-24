<script lang=ts>
    import Heading from "../Shared/Heading.svelte";
    import BrowseCategory from "../Shared/BrowseCategory.svelte";
    import SliderArrow from "../Shared/SliderArrow.svelte";

    let currentIndex : number = 1;
    const items : Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let shownItems = [...items.slice(0, 10)];

    $:  {
        const insert = currentIndex > 0 ? 0 : items.length - 1;
        const startIndex = (insert + currentIndex) % items.length;
        shownItems = [
            ...items.slice(startIndex),
            ...items.slice(0, startIndex)
        ];
    }
</script>

<section class="browse">
    <div class="text">
        <Heading>Browse By Categories</Heading>
        <p>Explore our diverse range of categories to find the perfect treasures that match your interests and preferences.</p>
    </div>
    <!-- <div class="categories-parent">
        <div class="categories">
            <button class="arrow" on:click={() => currentIndex--}>
                <SliderArrow><i class="fa-solid fa-angle-left"></i></SliderArrow>
            </button>
            <div class="container">
                {#each shownItems as item (item)}
                    <BrowseCategory>
                        <i slot="icon" class="fa-solid fa-microphone"></i>
                        <span slot="category">Music {item}</span>
                    </BrowseCategory>
                {/each}
            </div>
            <button class="arrow" on:click={() => currentIndex++}>
                <SliderArrow><i class="fa-solid fa-angle-right"></i></SliderArrow>
            </button>
        </div>
    </div> -->
</section>

<style lang=scss>
    // :root {
    //     --currentIndex: 1;
    // }

    .browse {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        text-align: center;
        height: $section-height-small;

        &::before {
            content: '';
            position: absolute;
            background: $section-light;
            width: 100%;
            height: calc($section-height-small + $wrapper-gap * 2);
            left: 0;
            z-index: -1;
        }
    }

    .categories-parent {
        width: 100%;
        position: relative;
    }

    .categories {
        overflow: hidden;
    }
    
    .arrow {
        border: none;
        background: none;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        z-index: 10;
        height: 100%;

        &:first-child {
            left: 0;
        }

        &:last-child {
            right: 0;
        }
    }

    .container {
        margin-left: calc($btn-gap * 1.5);
        display: flex;
        width: max-content;
        gap: calc($btn-gap * 1.6);
        // translate: calc(-1 * var(--currentIndex) * $btn-height * 2.25 - 2 * $btn-gap);
        // transition:
        //     translate $transition-normal;
    }
</style>