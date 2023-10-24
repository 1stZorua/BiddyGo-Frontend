<script lang=ts>
    export let active: boolean = true;
    export let activeButton: number;
    export let number: number;
    export let onClick: (index: number) => void;
</script>

<button 
    class={(activeButton === number) ? "active" : ""}
    data-active={active}
    on:click={() => onClick(number)}
>
    <span>
        <slot></slot>
    </span>
</button>

<style lang=scss>
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--primary, $btn-primary);
        background: none;
        border: $btn-option-border;
        padding-inline: $btn-padding-inline;
        width: var(--width, max-content);
        height: $btn-height;
        font-weight: 500;
        transition: 
            background $transition-fast,
            border-color $transition-fast;

        &:hover {
            cursor: pointer;
            border-color: $btn-tertiary;
            background: $btn-tertiary;

            span {
                color: $btn-secondary;
            }
        }
    }

    button.active {
        border-color: $btn-tertiary;
        background: $btn-tertiary;

        span {
            color: $btn-secondary;
        }
    }

    button[data-active="false"] {
        background: $skeleton-background-color;
        background-size: 200% 100%; 
        animation: $skeleton-animation;
        border-color: transparent;

        span {
            color: transparent;
        }
    }

    span {
        color: var(--color, $btn-primary);
        transition: 
            color $transition-fast;
    }

    @media(max-width: $screen-small) {
        button {
            width: 100%;
        }
    }
</style>