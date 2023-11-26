<script lang=ts>
    export let text: string = "";
    export let link: string = "";
</script>

<a href={link}>
    <button>
        <span>
            <slot></slot>
        </span>
    </button>
    {#if text !== ""}
        <span>{text}</span>
    {/if}
</a>

<style lang=scss>
    a {
        width: max-content;
        display: flex;
        align-items: center;
        gap: $btn-gap;
        color: $btn-primary;

        &:hover {
            cursor: pointer;

            button {
                border-color: $btn-tertiary;

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
        background: none;
        border: $btn-border-size solid var(--border-color, $btn-tertiary);
        border-radius: $btn-border-radius-rounded;
        width: $icon-size;
        height: $icon-size;
        transition:
            border-color $transition-fast;

        span {
            display: flex;
            align-items: center;
            color: var(--color, $btn-primary);
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