<script lang=ts>
    export let text : string;
</script>

<div>
    <button>
        <span>
            <slot></slot>
        </span>
    </button>
    <span>{text}</span>
</div>

<style lang=scss>
    div {
        display: flex;
        align-items: center;
        gap: $btn-gap;

        &:hover {
            cursor: pointer;

            button {
                span {
                    color: $btn-secondary;
                }
            
                &::after {
                    width: 75%;
                    height: 75%;
                }

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $btn-primary;
        overflow: hidden;
        position: relative;
        z-index: 0;
        background: $btn-secondary;
        border: $btn-secondary-border;
        border-radius: $btn-border-radius-rounded;
        width: $icon-size;
        height: $icon-size;

        span {
            color: $btn-primary;
            transition: color $transition-fast;
        }       

        &::after {
            content: '';
            background: $btn-tertiary;
            position: absolute;
            width: 0;
            height: 0;
            z-index: -1;
            border-radius: $btn-border-radius-rounded;
            transition: 
                width $transition-fast,
                height $transition-fast;
        }
    }

    span {
        font-weight: $font-weight-semiBold;
    }
</style>