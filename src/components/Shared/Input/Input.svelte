<script lang=ts>
    export let active: boolean = true;
    export let inputType: string = "text";
    export let min: number = 0;
    export let name: string = "";
    export let placeholder: string = "";
    export let value: number = 0;
    export let onInput: (...args: any) => void = () => {};
</script>

<input 
    data-active={active} 
    type={inputType} 
    name={name} 
    min={min} 
    placeholder={placeholder} 
    value={value != 0 ? value : ""}
    data-sveltekit-keepfocus
    on:input={onInput}
>

<style lang=scss>
    input {
        padding-inline: 30px;
        background: $gray-light;
        width: 100%;
        height: $btn-height;
        font-size: $font-size-base;
        color: $gray-dark;
        border-radius: $btn-border-radius-rounded;
        border: none;

        &::placeholder {
            color: $gray-regular;
        }

        &:hover, &:focus {
            outline: $btn-border-size solid $gray-regular;
        }
    }

    [data-active="false"] {
        background: $skeleton-background-color;
        background-size: 200% 100%; 
        animation: $skeleton-animation;
        pointer-events: none;

        &::placeholder {
            color: transparent;
        }
    }
</style>