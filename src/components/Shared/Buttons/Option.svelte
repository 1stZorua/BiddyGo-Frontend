<script lang=ts>
    export let active: boolean = true;
    export let value: number = 0;
    export let onClick: (value: number) => void = () => {};
</script>

<button 
    data-active={active}
    value={value}
    on:click={() => onClick(value)}
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
        border-radius: $btn-border-radius-rounded;
        padding-inline: $btn-padding-inline;
        width: var(--width, max-content);
        height: $btn-height;
        font-weight: 500;
        transition: 
            border-color $transition-fast;

        &:hover {
            cursor: pointer;
            border-color: $btn-tertiary;
        }
    }

    button[data-active="false"] {
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
        color: var(--color, $btn-primary);
    }
</style>