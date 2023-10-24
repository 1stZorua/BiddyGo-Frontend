<div>
    <slot></slot>
</div>

<style lang=scss>
    div {
        display: grid;
        place-content: center;
        width: var(--size);
        height: var(--size);
        background: var(--background);
        border-radius: var(--radius);
    }

    @media(max-width: $screen-medium) { 
        div {
            width: var(--small-width, var(--size));
            height: var(--small-height, var(--size));
        }
    }
</style>