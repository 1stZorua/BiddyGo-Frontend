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
        transition: 
            color $transition-fast,
            border-color $transition-fast;

        &:hover {
            cursor: pointer;
            color: $gray-dark;
            border-color: $gray-dark;
        }
    }
</style>