<script lang=ts>
    export let selected: boolean = false;
    export let onClick: () => void = () => {};
</script>

<button type="button" class="radio__card" on:click={onClick}>
    <input type="radio" checked={selected} hidden/>
</button>

<style lang=scss>
    .radio__card {
        min-width: 300px;
        height: 150px;
        border: $btn-border-size solid $gray-regular;
        border-radius: $btn-border-radius-normal;
        background: $secondary;

        &:hover {
            cursor: pointer;
        }
    }

    .radio__card:has(input:checked) {
        background: rgba(21, 152, 149, 0.1);
        border-color: $accent-secondary;
    }
</style>