<button>
    <slot></slot>
    <i class="fa-solid fa-arrow-right-long"></i>
</button>

<style lang=scss>
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: $line-gap;
        position: relative;
        z-index: 0;
        height: $btn-height;
        white-space: nowrap;
        font-family: $font-family-secondary;
        color: $btn-primary;
        background: none;
        border: none;
        text-transform: uppercase;
        font-weight: $font-weight-medium;;
        transition: 
            color $transition-fast;

        i {
            color: $btn-primary;
            font-size: $font-size-medium;
            animation: 
                arrow $transition-duration linear infinite paused;
        }
        
        &:hover {
            cursor: pointer;

            i {
                animation-play-state: running;
            }
        }
    }

    @keyframes arrow {
        0% {
            translate: 0;
        }
        50% {
            translate: 15px;
        }
        100% {
            translate: 0;
        }
    }
</style>