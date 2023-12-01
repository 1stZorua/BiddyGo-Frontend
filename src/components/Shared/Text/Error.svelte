<span>
    <i class="fa-solid fa-circle-exclamation"></i>
    <slot></slot>
</span>

<style lang=scss>
    span {
        display: flex;
        gap: 15px;
        align-items: center;
        border: $btn-border-size solid $error-color;
        border-left-width: calc($btn-border-size * 2.5);
        padding: 15px;
        color: $error-color;
    }
</style>