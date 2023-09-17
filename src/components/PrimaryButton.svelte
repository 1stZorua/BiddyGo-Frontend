
<button>
    <span>
        <slot></slot>
    </span>
</button>

<style lang=scss>
    button {
        color: $btn-primary;
        overflow: hidden;
        position: relative;
        z-index: 0;
        background: $btn-secondary;
        border: $btn-border;
        border-radius: $btn-border-radius-rounded;
        padding: $btn-padding;

        &::after {
            inset: 0;
            content: '';
            position: absolute;
            z-index: -2;
            background: $btn-primary;
            width: 100%;
            height: 100%;
            padding: 10px;
            transform: skew(30deg) translateX(-100%);
            transition: 
                transform $transition-normal;
        }

        &:hover {
            cursor: pointer;

            &::after {
                transform: skew(30deg) translateX(0);
            }
        }
    }

    span {
        color: white;
        mix-blend-mode: difference;
    }
</style>