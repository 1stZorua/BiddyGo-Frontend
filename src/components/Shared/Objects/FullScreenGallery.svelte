<script lang=ts>
    import { onDestroy, onMount } from "svelte";
	import type { Image } from "$lib/types/types.ts";
    import { fullscreenGallery, activeIndex } from "../../../stores/index.ts"
    import { SecondaryText, Slider, SliderArrow } from "../../index.ts";

    export let images: Array<Image> = [];

    let sliderContainer: HTMLDivElement;
    let slider: HTMLElement;
    let currentIndex = $activeIndex;

    function closeFullScreenGallery() {
        fullscreenGallery.set(false);
    }
    
    function navigateSlider(direction: number) {
        let newIndex = currentIndex + direction;
        
        if (newIndex < 0) {
            newIndex = images.length - 1;
        } else if (newIndex >= images.length) {
            newIndex = 0;
        }
        
        currentIndex = newIndex;
        slider.scrollLeft = currentIndex * (slider.scrollWidth / images.length);
    }
    
    function onSliderScroll() {
        currentIndex = Math.round(slider.scrollLeft / (slider.scrollWidth / images.length));
    }

    onMount(() => {
        slider = sliderContainer.querySelector('.container')!;
        slider.scrollLeft += currentIndex * (slider.scrollWidth / images.length);
        slider.addEventListener("scroll", onSliderScroll);
    });

    onDestroy(() => {
        slider.removeEventListener("scroll", onSliderScroll);
    })
</script>

<div class="gallery">
    <div class="info">
        <SecondaryText --color="#B7B7B7">{currentIndex + 1} / {images.length}</SecondaryText>
    </div>
    <div class="cta">
        <button on:click={closeFullScreenGallery}>
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="center">
        <button 
            class="arrow"
            on:click={() => navigateSlider(-1)}
        >
            <SliderArrow>
                <i class="fa-solid fa-chevron-left"></i>
            </SliderArrow>
        </button>
        <div 
            class="slider-container"
            bind:this={sliderContainer}
        >
            <Slider --slider-gap="0" --slider-padding-right="0">
                {#each images as image}
                    <div>
                        <img src={"data:image/jpeg;base64," + image?.fileContents} alt="placeholder">
                    </div>
                {/each}
            </Slider>
        </div>
        <button 
            class="arrow" 
            on:click={() => navigateSlider(1)}
        >
            <SliderArrow>
                <i class="fa-solid fa-chevron-right"></i>
            </SliderArrow>
        </button>
    </div>
    <div class="view-slider">
        <button on:click={() => navigateSlider(-1)}>
            <img src={"data:image/jpeg;base64," + images[(currentIndex - 1) < 0 ? images.length - 1: (currentIndex - 1)]?.fileContents} alt="placeholder">
        </button>
        <div>
            <img src={"data:image/jpeg;base64," + images[currentIndex]?.fileContents} alt="placeholder">
        </div>
        <button on:click={() => navigateSlider(1)}>
            <img src={"data:image/jpeg;base64," + images[(currentIndex + 1) >= images.length ? 0 : (currentIndex + 1)]?.fileContents} alt="placeholder">
        </button>
    </div>
</div>

<style lang=scss>
    .gallery {
        display: flex;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 11;
        background: $primary;
    }

    .info, .cta {
        position: absolute;
        margin: $wrapper-margin-inline-small;
        z-index: 20;
    }
    
    .cta {
        right: 0;
        
        button {
            color: $gray-regular;
            font-size: $font-size-medium;
            background: none;
            border: none;

            &:hover {
                cursor: pointer;
                color: $gray-dark;
            }
        }
    }

    .center {
        display: flex;
        align-items: center;
    }

    .slider-container {
        display: flex;
        align-items: center;
    }

    .slider-container div {
        display: flex;
        align-items: center;
    }

    .slider-container div img {
        width: 100vw;
        padding-inline: 25vw;
        scroll-snap-align: center;
    }

    .arrow {
        position: absolute;
        z-index: 20;
        margin: $wrapper-margin-inline-small;
        background: none;
        border: none;

        &:last-child {
            right: 0;
        }
    }

    .view-slider {
        display: none;
        align-items: center;
        gap: 30px;
        margin-block: $wrapper-margin-inline-small;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);

        > * {
            display: flex;
        }

        button {
            border: none;
            background: none;
        }

        div {
            outline: $btn-border-size solid $accent-secondary;
        }

        img {
            height: 20vw;
            width: 20vw;
            object-fit: cover;

            &:hover {
                cursor: pointer;
            }
        }
    }

    @media (max-width: $screen-extraLarge) {
        .slider-container div img {
            padding-inline: 15vw;
        }
    }

    @media (max-width: $screen-medium) {
        .slider-container div img {
            padding-inline: 0;
        }
    }

    @media (max-width: $screen-small) {
        .arrow {
            display: none;
        }

        .view-slider {
            display: flex;
        }
    }
</style>