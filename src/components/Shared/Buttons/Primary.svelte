<button>
    <span>
        <slot></slot>
    </span>
</button>

<style lang=scss>
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--primary);
        overflow: hidden;
        position: relative;
        z-index: 0;
        background: var(--secondary);
        border: $btn-primary-border;
        border-radius: $btn-border-radius-rounded;
        padding-inline: $btn-padding-inline;
        height: $btn-height;

        &::after {
            inset: 0;
            content: '';
            position: absolute;
            z-index: -2;
            background: var(--primary);
            width: 100%;
            height: 100%;
            padding: 20px;
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