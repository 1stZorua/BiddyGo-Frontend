<script lang=ts>
    let slider: HTMLElement;
    let scrollLeft: number;
    let isDown: boolean = false;
    let startX: number;
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
        const x = (e.pageX - slider.offsetLeft);
        const walk = (x - startX) * 2;
        slider!.scrollLeft = scrollLeft - walk;
        console.log(Math.round(window.devicePixelRatio * 100));
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
  
<div
    class="container"
    class:is-active={isDown}
    role="presentation"
    aria-label="Image Carousel"
    bind:this={slider}
    on:mousedown={onSliderMouseDown}
    on:mouseleave={onSliderMouseUpOrLeave}
    on:mouseup={onSliderMouseUpOrLeave}
    on:mousemove={onSliderMouseMove}
>
    <slot></slot>
</div>

<style lang=scss>
    .container {
        margin-top: var(--margin-top, 0);
        position: absolute;
        display: flex;
        gap: var(--slider-gap, 50px);
        user-select: none;
        width: 100%;
        height: max-content;
        overflow-x: scroll;
        padding-right: var(--slider-padding-right, 200px);
        -ms-overflow-style:none;
        scrollbar-width: none;
        scroll-snap-type: x mandatory;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .container.is-active {
        cursor: grabbing;
        cursor: -webkit-grabbing;
    }
</style>