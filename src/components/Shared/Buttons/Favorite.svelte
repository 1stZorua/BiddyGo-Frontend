<script lang=ts>
    export let active: boolean = true;
    export let isFavorited: boolean = false;
    export let onClick: () => void = () => {};
</script>

<button data-active={active} on:click={onClick}>   
    <i 
        class="fa-solid fa-heart"
        class:fa-regular={!isFavorited}
        class:fa-solid={isFavorited}
    ></i>
    <slot></slot>
</button>

<style lang=scss>
    button {
        display: grid;
        grid-auto-flow: column;
        justify-items: center;
        place-items: center;
        gap: 5px;
        background: $btn-secondary;
        color: $btn-primary;
        width: max-content;
        padding-inline: 20px;
        height: $btn-height;
        border-radius: $btn-border-radius-rounded;
        outline: $btn-border-size solid transparent;
        outline-offset: 5px;
        border: none;
        transition: 
            outline-color $transition-fast;

        &:hover {
            cursor: pointer;
            outline-color: $btn-secondary;

            i {
                font-weight: 800;
            }
        }
    }

    button[data-active="false"] {
        display: none;
    }
</style>