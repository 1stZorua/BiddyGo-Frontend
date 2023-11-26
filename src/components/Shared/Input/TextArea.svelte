<script lang=ts>
	import { fade, slide } from "svelte/transition";
	import { SmallText } from "../../index.ts";

    export let active: boolean = true;
    export let label: string = "";
    export let value: string | number = "";
    export let error: string[] | undefined = [];
    export let errorLocation : string = "down";
    export let onInput: (event: Event) => void = () => {};
</script>

<div class="input" data-active={active}>
    <label for={$$props.name}>
        {label}
    </label>
    <div>
        <textarea 
            class:error={error && error?.length != 0}
            data-active={active} 
            data-error={error?.at(0)}
            data-sveltekit-keepfocus
            placeholder=""
            bind:value={value}
            on:input={onInput}
            {...$$props}
        ></textarea>
        {#if error && error?.length != 0}
            <i class="fa-solid fa-circle-exclamation" transition:fade></i>
            <div class="error__text" style="{errorLocation !== "down" ? "position:absolute;top:-45px;" : "position:absolute;top:70px"}" transition:slide>
                <SmallText --color="#f05b4d">{error?.at(0)}</SmallText>
            </div>
        {/if}
    </div>  
</div>

<style lang=scss>
    .input {
        position: relative;
    }

    .input:not(:has(textarea:placeholder-shown)) label,
    .input:is(:hover, :focus) label {
        transform: translateY(-100%);
        font-size: calc($font-size-base * 0.75);
    }

    .input:has(i) textarea {
        padding-right: 60px;
    }

    label {
        position: absolute;
        padding-inline: 30px;
        top: 20px;
        color: $gray-regular;
        pointer-events: none;
        transition:
            transform $transition-fast,
            font-size $transition-fast;
    }

    .input > div {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    textarea {
        padding: 30px;
        padding-block: 15px;
        background: $gray-light;
        width: 100%;
        height: 20rem;
        font-size: $font-size-base;
        color: $gray-dark;
        border-radius: $btn-border-radius-normal;
        resize: none;
        border: none;
        font-family: $font-family-primary;
        word-spacing: 0%;

        &::placeholder {
            color: $gray-regular;
        }

        &:hover, &:focus {
            outline: $btn-border-size solid $gray-regular;
        }
    }

    textarea.error, textarea.error:is(:hover, :focus) {
        outline: $btn-border-size solid $error-color;
    }

    i {
        position: absolute;
        right: 30px;
        top: 50%; 
        transform: translateY(-50%); 
        color: $error-color;
        background: $gray-light;
        pointer-events: none;
    }

    .error__text {
        pointer-events: none;
    }

    .input[data-active="false"] textarea {
        background: $skeleton-background-color;
        background-size: 200% 100%; 
        animation: $skeleton-animation;
        pointer-events: none;

        &::placeholder {
            color: transparent;
        }
    }

    .input[data-active="false"] label {
        display: none;
    }
</style>