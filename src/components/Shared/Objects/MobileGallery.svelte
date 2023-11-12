<script lang=ts>
    import { fullscreenGallery, activeIndex } from "../../../stores/index.ts";
	import type { Image } from "$lib/types/types.ts";
    import { Slider } from "../../index.ts";

    export let active: boolean = true;
    export let images: Array<Image> = [];

    function openFullScreenGallery(index: number) {
        activeIndex.set(index);
        fullscreenGallery.set(true)
    }
</script>

<div class="mobile-image-container">
    <Slider --gap="30px">
        {#if active}
            {#each images as image, index}
                <button on:click={() => openFullScreenGallery(index)}>
                    <img src={"data:image/jpeg;base64," + image?.fileContents} alt="placeholder">
                </button>
            {/each}
        {:else}
            {#each Array(10) as _}
                <button>
                    <div></div>
                </button>
            {/each}
        {/if}
    </Slider>
</div>

<style lang=scss>
    .mobile-image-container {
        display: none;
        height: 450px;

        img {
            height: 450px;
            width: 450px;
            object-fit: cover;
        }

        div {
            background: $skeleton-background-color;
            background-size: 200% 100%; 
            animation: $skeleton-animation;
            width: 450px;
            height: 450px;
        }
    }

    button {
        border: none;
        background: none;

        &:hover {
            cursor: pointer;
        }
    }

    @media (max-width: $screen-large) {
        .mobile-image-container {
            display: block;
        }
    }

    @media (max-width: $screen-medium) {
        .mobile-image-container {
            height: 300px;

            img {
                height: 300px;
                width: 300px;
            }

            div {
                width: 300px;
                height: 300px;
            }
        }
    }
</style>