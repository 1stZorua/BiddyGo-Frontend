<script lang=ts>
    export let src: string;

    let image: HTMLImageElement;
    let zoomContainer: HTMLDivElement;
    let zoomImage: HTMLDivElement;
    let zoom: number = 0.25;

    function onZoomContainerMouseMove(e: MouseEvent) {
        let x = e.clientX - zoomContainer.getBoundingClientRect().left;
        let y = e.clientY - zoomContainer.getBoundingClientRect().top;
        
        let xperc = (x / image.offsetWidth) * 100;
        let yperc = (y / image.offsetHeight) * 100;

        xperc = xperc - zoom;
        yperc = yperc - zoom;

        zoomImage.style.backgroundPositionX = xperc + "%";
        zoomImage.style.backgroundPositionY = yperc + "%";
        
        zoomImage.style.left = x - (zoomImage.offsetWidth * zoom / (zoom * 2)) + "px";
        zoomImage.style.top = y - (zoomImage.offsetHeight * zoom / (zoom * 2)) + "px";
    }
</script>

<div 
    class="zoom-container"
    role="presentation"
    aria-label="Zoom Container"
    bind:this={zoomContainer}
    on:mousemove={onZoomContainerMouseMove}
>
    <img bind:this={image} src={src} alt={src}>
    <div class="zoom-image" bind:this={zoomImage} style="background: url({src})"></div>
</div>

<style lang=scss>
.zoom-container {
    position: relative;
    overflow: hidden;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: $btn-border-radius-normal;
    }

    &:hover {
        cursor: none;

        .zoom-image {
            opacity: 1;
        }
    }
}

.zoom-image {
    position: absolute;
    background-repeat: no-repeat;
    box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.3);
    border: $btn-option-border;
    pointer-events: none;
    width: 25%;
    height: 25%;
    opacity: 0;
    scale: 1.75;
    transition: 
        opacity $transition-fast;
}
</style>
