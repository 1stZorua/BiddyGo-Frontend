<script lang=ts>
    export let active: boolean = true;
</script>

<h3 data-active={active}>
    <slot></slot>
</h3>

<style lang=scss>
    h3 {
        font-size: $font-size-medium;
        font-weight: var(--font-weight, $font-weight-semiBold);
        color: var(--color, $primary);
    }

    [data-active="false"] {
        background: $skeleton-background-color;
        background-size: 200% 100%; 
        animation: $skeleton-animation;
        color: transparent;
    }

    @media(max-width: $screen-wide) {
        h3 {
            color: var(--screen-wide-color, $primary);
        }
    }
</style>