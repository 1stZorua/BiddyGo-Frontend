<script lang=ts>
	import { fade, slide } from "svelte/transition";
	import { SmallText } from "../../index.ts";

    export let active: boolean = true;
    export let label: string = "";
    export let value: string | number;
    export let error: string[] | undefined = [];
    export let errorLocation : string = "down";
    export let onInput: (event: Event) => void = () => {};
</script>

<div class="input" data-active={active}>
    <label for={$$props.name}>
        {label}
    </label>
    <div>
        <input 
            class:error={error && error?.length != 0}
            data-active={active} 
            data-error={error?.at(0)}
            data-sveltekit-keepfocus
            placeholder=""
            bind:value={value}
            on:input={onInput}
            {...$$props}
        >
        {#if error && error?.length != 0}
            <i class="fa-solid fa-circle-exclamation" transition:fade></i>
            <div style="{errorLocation !== "down" ? "position:absolute;top:-45px;" : "position:absolute;top:70px"}" transition:slide>
                <SmallText --color="#f05b4d">{error?.at(0)}</SmallText>
            </div>
        {/if}
    </div>  
</div>

<style lang=scss>
    .input {
        position: relative;
    }

    .input:not(:has(input:placeholder-shown)) label,
    .input:is(:hover, :focus) label {
        transform: translateY(-135%);
        font-size: calc($font-size-base * 0.75);
    }

    .input:has(i) input {
        padding-right: 60px;
    }

    label {
        position: absolute;
        padding-inline: 30px;
        top: 50%;
        transform: translateY(-50%);
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

    input.error, input.error:is(:hover, :focus) {
        outline: $btn-border-size solid $error-color;
    }

    i {
        position: absolute;
        right: 30px; // Adjust as needed
        top: 50%; // Center vertically
        transform: translateY(-50%); // Center vertically
        color: $error-color;
        background: $gray-light;
    }

    .input[data-active="false"] input {
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