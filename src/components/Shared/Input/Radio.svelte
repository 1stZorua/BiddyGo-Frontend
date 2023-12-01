<script lang=ts>
    export let selected: boolean = false;
    export let onClick: () => void = () => {};
</script>

<button type="button" class="radio__card" on:click={onClick}>
    <input type="radio" checked={selected} hidden/>
    <slot></slot>
</button>

<style lang=scss>
    .radio__card {
        flex-shrink: 0;
        position: relative;
        min-width: 275px;
        max-width: 275px;
        height: 150px;
        border: $btn-border-size solid $gray-regular;
        border-radius: $btn-border-radius-normal;
        background: $secondary;
        padding-inline: 8px;

        &:hover {
            cursor: pointer;
        }
    }

    .radio__card:has(input:checked) {
        background: rgba(21, 152, 149, 0.1);
        border-color: $accent-secondary;

        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: $accent-secondary;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            top: 10px;
            right: 10px;
        }
    }
</style>