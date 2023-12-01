<script lang=ts>
    export let link: string = "";
</script>

<a
    rel="external" 
    href={link}
    data-sveltekit-preload-data
>
    <slot></slot>
</a>

<style lang=scss>
    a {
        display: grid;
        place-content: center;
        flex-shrink: 0;
        min-width: 275px;
        max-width: 275px;
        height: 150px;
        border-radius: $btn-border-radius-normal;
        background: $accent-primary;
        border: $btn-border-size solid $accent-secondary;
        padding-inline: 8px;

        &:hover {
            cursor: pointer;
        }
    }
</style>