<span>
    <slot></slot>
</span>

<style lang=scss>
    span {
        display: flex;
        align-items: center;
        gap: $line-gap;
        color: var(--line-color, $btn-primary);
        font-family: $font-family-secondary;
        font-weight: $font-weight-medium;
        text-transform: uppercase;

        &::before {
            content: '';
            width: $line-width;
            background: var(--line-color, $btn-primary);
            height: $line-height;
            display: inline-block;
        }
    }
</style>