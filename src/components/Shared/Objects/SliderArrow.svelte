<button>
    <slot></slot>
</button>

<style lang=scss>
    button {
        height: $btn-height;
        width: $btn-height;
        background: $btn-secondary;
        border: $btn-border-size solid $gray-regular;
        border-radius: $btn-border-radius-rounded;
        color: $gray-regular;

        &:hover {
            cursor: pointer;
        }
    }
</style>