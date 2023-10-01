<script lang=ts>
	import Card from "../Listing/Card.svelte";
    import Subheading from "../../Shared/Text/Subheading.svelte";
	import TertiaryButton from "../../Shared/Buttons/Tertiary.svelte";
    
    /** @type {{
        title: string,
        cards: Array<object>
    }} */
    export let category : any;

    let slider: HTMLElement;
    let isDown: boolean = false;
    let startX: number;
    let scrollLeft: number;
    let animationFrameId: number;

    function onSliderMouseDown(e: MouseEvent) {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;

        cancelAnimationFrame(animationFrameId);
    }

    function onSliderMouseUpOrLeave() {
        if (isDown) flickEffect();
        isDown = false;
    }

    function onSliderMouseMove(e: MouseEvent) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    }

    function flickEffect() {
        let flickVelocity = slider.scrollLeft - scrollLeft;
        const maxVelocity = 50;

        function animateScroll() {
            flickVelocity *= 0.95;

            if (Math.abs(flickVelocity) > maxVelocity) {
                flickVelocity = flickVelocity > 0 ? maxVelocity : -maxVelocity;
            }

            slider.scrollLeft += flickVelocity;

            if (Math.abs(flickVelocity) < 0.1) {
                cancelAnimationFrame(animationFrameId);
                scrollLeft = slider.scrollLeft;
            } else {
                animationFrameId = requestAnimationFrame(animateScroll);
            }
        }

        animateScroll();
    }
</script>

<section class="slider">
    <div class="separator">
        <Subheading>{category.title}</Subheading>
        <TertiaryButton>View All</TertiaryButton>
    </div>
    <div class="container" class:is-active={isDown}
        role="presentation" 
        aria-label="Image Carousel"
        bind:this={slider}
        on:mousedown={onSliderMouseDown}
        on:mouseleave={onSliderMouseUpOrLeave}
        on:mouseup={onSliderMouseUpOrLeave}
        on:mousemove={onSliderMouseMove}
    >
        {#each category.cards as cardData}
            <div>
                <Card cardData={cardData}></Card>
            </div>
        {/each}
    </div>
</section>

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

    .container {
        margin-top: 120px;
        position: absolute;
        display: flex;
        gap: 50px;
        user-select: none;
        width: 100%;
        overflow-x: scroll;
        padding-right: 100px;

        -ms-overflow-style:none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .container.is-active {
        cursor: grabbing;
        cursor: -webkit-grabbing;
    }

    @media(max-width: $screen-extraLarge) { 
        .separator {
            flex-direction: column;
        }
    }
</style>