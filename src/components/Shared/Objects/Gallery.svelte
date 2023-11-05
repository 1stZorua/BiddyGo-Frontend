<script lang=ts>
    import { fullscreenGallery, activeIndex } from "../../../stores/index.ts"
	import type { Image } from "$lib/types/types.ts";
    import { ZoomImage } from "../../index.ts";

    let activeImageIndex: number = 0;
    let previousActiveIndex: number = 0;

    function onMouseClick(index: number) {
        activeImageIndex = index;
        previousActiveIndex = index;
    }

    function onMouseEnter(index: number) {
        activeImageIndex = index;
    }

    function onMouseLeave() {
        activeImageIndex = previousActiveIndex;
    }

    function openFullScreenGallery() {
        activeIndex.set(activeImageIndex);
        fullscreenGallery.set(true)
    }

    export let active: boolean = true;
    export let images: Array<Image> = [];
</script>

{#if active}
    <div class="image-container">
        <div class="preview-container">
            <ZoomImage src={"data:image/jpeg;base64," + images[activeImageIndex]?.fileContents}></ZoomImage>
        </div>
        <div class="images">
            {#each images.slice(0, 2) as image, index}
                <button 
                    on:click={() => onMouseClick(index)}
                    on:mouseenter={() => onMouseEnter(index)}
                    on:mouseleave={onMouseLeave}
                >
                    <img class={(activeImageIndex === index) ? "active" : ""}
                        src={"data:image/jpeg;base64," + image?.fileContents}
                        alt="placeholder"
                    >
                </button>
            {/each}
            <button 
                class="more" 
                data-length={images.length - 2}
                on:click={openFullScreenGallery}
            >
                <img src={"data:image/jpeg;base64," + images[images.length - 1]?.fileContents} alt="test">
            </button>
        </div>
    </div>
{:else}
    <div class="image-container">
        <div class="preview-container">
            <div></div>
        </div>
        <div class="images">
            {#each Array(2) as _}
                <div></div>
            {/each}
            <div></div>
        </div>
    </div>
{/if}

<style lang=scss>
    .image-container {
        display: flex;
        flex-direction: column;
        gap: 30px;
        height: max-content;
        width: max-content;

        button {
            background: none;
            border: none;
            height: 180px;

            &:hover {
                cursor: pointer;
            }
        }

        img {
            object-fit: cover;
            border-radius: $btn-border-radius-normal;
            outline: $btn-border-size solid $secondary;
            transition: 
                outline-color $transition-fast;
        }

        img.active {
            outline: $btn-border-size solid $accent-secondary;
        }
    }

    .preview-container {
        position: relative;
        width: 600px;
        height: 500px;

        div {
            background: $skeleton-background-color;
            background-size: 200% 100%; 
            animation: $skeleton-animation;
            width: 100%;
            height: 100%;
            border-radius: $btn-border-radius-normal;
        }
    }

    .images {
        display: flex;
        justify-content: space-between;

        img, div {
            width: 180px;
            height: 180px;
        }

        div {
            background: $skeleton-background-color;
            background-size: 200% 100%; 
            animation: $skeleton-animation;
            border-radius: $btn-border-radius-normal;
        }
    }

    .images .more {
        position: relative;
        height: 180px;
        
        &::before {
            display: grid;
            place-items: center;
            color: $secondary;
            font-size: $font-size-medium;
            content: '+' attr(data-length);
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.8;
            background: $accent-tertiary;
            border-radius: $btn-border-radius-normal;
        }
    }

    @media (max-width: $screen-wide) {
        .image-container {
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            gap: 30px;

            .preview-container {
                width: 100%;
                height: 600px;
            }
        }

        .images {
            flex-direction: column;
        }
    }

    @media (max-width: $screen-large) {
        .image-container {
            display: none;
        }
    }
</style>