<script lang=ts>
    export let active: boolean = true;
</script>

<span data-active={active}>
    <slot></slot>
</span>

<style lang=scss>
    span {
        color: var(--color);
        font-family: var(--font-family, $font-family-secondary);
        font-weight: var(--font-weight, $font-weight-regular);
        text-transform: var(--text-transform, uppercase);
    }

    [data-active="false"] {
        background: $skeleton-background-color;
        background-size: 200% 100%; 
        animation: $skeleton-animation;
        color: transparent;
        width: max-content;
    }
</style>

