<script lang=ts>
    export let active: boolean = true;
</script>

<span data-active={active}>
    <slot></slot>
</span>

<style lang=scss>
    span {
        display: flex;
        align-items: center;
        gap: $line-gap;
        color: var(--line-color, $primary);
        font-family: $font-family-secondary;
        font-weight: $font-weight-medium;
        text-transform: uppercase;

        &::before {
            content: '';
            width: $line-width;
            background: var(--line-color, $primary);
            height: $line-height;
            display: inline-block;
        }
    }

    [data-active="false"] {
        background: $skeleton-background-color;
        background-size: 200% 100%; 
        animation: $skeleton-animation;
        color: transparent;

        &::before {
            display: none;
        }
    }

    @media(max-width: $screen-wide) {
        span {
            color: var(--screen-wide-color, var(--line-color, $primary));

            &::before {
                background: var(--screen-wide-color, var(--line-color, $primary));
            }
        }
    }
</style>