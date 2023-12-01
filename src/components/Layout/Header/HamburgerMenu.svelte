<script lang=ts>
    import { headerLinks } from "./config";
    import { scrollLock } from "../../../stores/index.ts"
	import { SmallText } from "../../index.ts";
    import { page } from "$app/stores";
	import { onMount } from "svelte";

    let toggled: boolean = false;
    let container: HTMLDivElement;
    let menu: HTMLDivElement;

    function onMenuToggle() {
        toggled = !toggled 
        scrollLock.set(toggled);
    }

    function handleResize() {
        if (window.getComputedStyle(container).display!== "block" && menu.classList.contains("is-active")) {
            scrollLock.set(false);
        } else if (window.getComputedStyle(container).display === "block" && menu.classList.contains("is-active")) {
            scrollLock.set(true);
        }
    }

    onMount(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    })
</script>

<div bind:this={container} class="container">
    <button class:is-active={toggled} on:click={onMenuToggle}>
        <span></span>
        <span></span>
        <span></span>
    </button>
    <div bind:this={menu} class="menu" class:is-active={toggled}>
        <ul>
            {#each headerLinks as link (link)}
                <li>
                    <a rel="external" href={link.href}>
                        <SmallText --color="white">{link.name}</SmallText>
                    </a>
                </li>
            {/each}
            <li>
                <a rel="external" href="/login">
                    <SmallText --color="white">{$page.data.user !== null ? "Account" : "Login"}</SmallText>
                </a>
            </li>
        </ul>
    </div>
</div>

<style lang=scss>
    .container {
        display: none;
        z-index: 20;

        &::before {
            display: none;
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            left: 0;
            top: 0;
            z-index: -1;                
        }
    }
    
    .container:has(.menu.is-active)::before {
        display: block;
    }

    button {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        background: none;
        border: none;
        width: 30px;
        height: 20px;
        z-index: 2;
        opacity: 0.9;

        &:hover {
            cursor: pointer;
            
            span {
                background: $accent-secondary;
            }

            &::after {
                transform: translate(-25%, 25%);
            }
        }
    }

    button.is-active {
        span {
            background: $secondary;

            &:first-child {
                rotate: 45deg;
                width: 100%;
                translate: 0 8px;
            }

            &:nth-child(2) {
                opacity: 0;
            }

            &:last-child {
                rotate: -45deg;
                width: 100%;
                translate: 0 -10px;
            }
        }
    }

    span {
        height: $btn-border-size;
        background: $btn-primary;
        display: block;
        transition: 
            background $transition-fast,
            rotate $transition-fast,
            translate $transition-fast,
            opacity $transition-fast;
        width: 100%;

        &:first-child {
            width: 60%;
        }

        &:last-child {
            width: 60%;
            align-self: end;
        }
    }

    .menu {
        display: flex;
        align-items: center;
        translate: -20%;
        position: absolute;
        height: 100%;
        overflow-y: auto;
        width: 75%;
        translate: 100%;
        right: 0;
        top: 0;
        opacity: 0.9;
        transition:
            translate $transition-normal;
        background: $accent-secondary;
        z-index: -1;
    }

    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;
        width: 100%;
    }

    li a {
        color: $primary;
        position: relative;
        height: max-content;

        &::after {
            content: '';
            bottom: 0;
            display: block;
            position: absolute;
            background: $accent-secondary;
            height: $btn-border-size;
            width: 0;
            transition: 
                width $transition-fast, 
                color $transition-fast;
        }

        &:hover {
            color: $accent-secondary;
            cursor: pointer;

            &::after {
                width: 50%;
                border-radius: $btn-border-radius-small;
            }
        }
    }
    
    .menu.is-active {
        translate: 0;
    }

    @media(max-width: $screen-extraLarge) {
        .container {
            display: block;
        }
    }
</style>