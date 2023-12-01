<script lang=ts>
	import { onDestroy, onMount } from "svelte";
    import { isModalOpen, scrollLock } from "../../../stores/index.ts";
	import { Heading, Subtitle } from "../../index.ts";

    let modal: HTMLElement;

    function onModalClick(e: MouseEvent) {
        if (e.target !== modal) return;
        isModalOpen.set(false);
    }

    onMount(() => {
        scrollLock.set(true);
    });

    onDestroy(() => {
        scrollLock.set(false)
    });
</script>

<div 
    role="presentation"
    aria-label="Modal"
    class="modal" 
    bind:this={modal}
    on:click={onModalClick}
>
    <div class="form">
        <div class="text">
            <div class="title">
                <Subtitle>
                    <slot name="type"></slot>
                </Subtitle>
                <Heading --font-weight="500">
                    <slot name="title"></slot>
                </Heading>
            </div>
            <button on:click={() => isModalOpen.set(false)}>
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
        <div class="cta">
            <slot name="cta"></slot>
        </div>
        <slot name="message"></slot>
    </div>
</div>

<style lang=scss>
    .modal {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        top: 0;
        left: 0;
        z-index: 20;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 75%;
        max-width: 625px;
        background: $secondary;
        padding: 20px;
        border-radius: $btn-border-radius-normal;
    }

    .text {
        display: flex;
        justify-content: space-between;

        button {
            height: max-content;
            background: none;
            border: none;

            &:hover {
                cursor: pointer;
                color: $gray-dark;
            }
        }
    }

    .cta {
        align-self: end;
    }
</style>