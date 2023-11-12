<script lang=ts>
    export let active: boolean = true;
    export let onClick: () => void = () => {};
</script>

<button data-active={active} on:click={onClick}>
    <span>
        <slot></slot>
    </span>
</button>

<style lang=scss>
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color, $primary);
        overflow: hidden;
        position: relative;
        z-index: 0;
        width: var(--width, max-content);
        background: var(--background-color, $secondary);
        border: $btn-primary-border;
        border-radius: $btn-border-radius-rounded;
        padding-inline: $btn-padding-inline;
        white-space: nowrap;
        height: $btn-height;

        &::after {
            inset: 0;
            content: '';
            position: absolute;
            z-index: -2;
            background: var(--color, $primary);
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

    [data-active="false"] {
        background: $skeleton-background-color;
        background-size: 200% 100%; 
        animation: $skeleton-animation;
        border: transparent;
        pointer-events: none;

        span {
            color: transparent;
        }
    }

    span {
        color: var(--color, white);
        mix-blend-mode: var(--mix-blend-mode, difference);
    }

    @media (max-width: $screen-extraLarge) { 
        button {
            width: var(--small-width, max-content);
        }
    }
</style>