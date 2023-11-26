<script lang=ts>
    export let active: boolean = true;
</script>

<h2 data-active={active}>
    <slot></slot>
</h2>

<style lang=scss>
    h2 {
        font-size: $font-size-heading;
        font-weight: var(--font-weight, $font-weight-semiBold);
        color: var(--color, $primary);
    }

    [data-active="false"] {
        background: $skeleton-background-color;
        background-size: 200% 100%; 
        animation: $skeleton-animation;
        color: transparent;
        width: max-content;
    }
</style>