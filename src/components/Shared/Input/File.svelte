<script lang=ts>
	import { fade, slide } from "svelte/transition";
	import { MediumText, SmallText } from "../../index.ts";

    export let active: boolean = true;
    export let error: string[] | undefined = [];
    export let errorLocation : string = "down";
    export let value: File[] = [];
    export let onInput: any = () => {};
</script>

<div class="input">
    <div class="text">
        <MediumText>Upload Pictures</MediumText>
        <SmallText>or drag and drop</SmallText>
    </div>
    <input
        class:error={error && error?.length != 0}
        data-active={active} 
        data-error={error?.at(0)}
        data-sveltekit-keepfocus
        type="file"
        value={value}
        on:input={onInput}
        {...$$props}
    >
    {#if error && error?.length != 0}
        <i class="fa-solid fa-circle-exclamation" transition:fade></i>
        <div class="error__text" style="{errorLocation !== "down" ? "position:absolute;" : "position:absolute;"}" transition:slide>
            <SmallText --color="#f05b4d">{error?.at(0)}</SmallText>
        </div>
    {/if}
</div>

<style lang=scss>
    .input {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 100%;
    }

    .input:has(.error) .text {
        display: none;
    }

    .text {
        display: flex;
        flex-direction: column;
        position: absolute;
        text-align: center;
        pointer-events: none;
    }

    input {
        width: 100%;
        height: 100%;
        border: $btn-border-size dashed $gray-dark;
        border-radius: $btn-border-radius-normal;
        color: transparent;

        &:hover {
            cursor: pointer;
        }
    }

    input.error, input.error:is(:hover, :focus) {
        border-color: $error-color;
    }

    i {
        position: absolute;
        right: 30px;
        top: 50%; 
        transform: translateY(-50%); 
        color: $error-color;
        background: $secondary;
        pointer-events: none;
    }

    .error__text {
        pointer-events: none;
    }

    ::-webkit-file-upload-button, ::file-selector-button {
        display: none;
    }
</style>