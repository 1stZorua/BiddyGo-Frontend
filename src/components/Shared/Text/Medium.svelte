<script lang=ts>
    export let active: boolean = true;
</script>

<span data-active={active}>
    <slot></slot>
</span>

<style lang=scss>
    span {
        color: var(--color, $primary);
        font-size: $font-size-medium;
        font-weight: var(--font-weight, $font-weight-medium);
        width: max-content;
    }

    [data-active="false"] {
        background: $skeleton-background-color;
        background-size: 200% 100%; 
        animation: $skeleton-animation;
        color: transparent;
    }
</style>