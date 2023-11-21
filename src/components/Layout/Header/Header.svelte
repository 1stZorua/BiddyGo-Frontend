<script lang=ts>
    import { headerLinks } from "./config";
    import { Logo, PrimaryButton } from "../../index.ts";
	import HamburgerMenu from "./HamburgerMenu.svelte";
    import { page } from "$app/stores";
    
    let active: boolean = false;

    function handleSearchClick() { 
        active = !active; 
    }
</script>

<header>
    <nav>
        <Logo --background="white"></Logo>
        <ul class="links">
            {#each headerLinks as link}
                <li><a href={link.href}>{link.name}</a></li>
            {/each}
        </ul>
        <div class="cta">
            <form>
                <input 
                    type="search" 
                    name="search" 
                    placeholder="Search..." 
                    class:is-active={active}
                    on:click={handleSearchClick}
                >
            </form>
            <PrimaryButton onClick={() => window.location.href="/login"}>{!$page.data.user ? "Sign In" : "Account"}</PrimaryButton>
        </div>
        <HamburgerMenu></HamburgerMenu>
    </nav>
</header>

<style lang=scss>
    header {
        max-height: $header-height;
        margin-bottom: $header-margin-bottom;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 120px;
    }

    ul {
        list-style: none;
        display: flex;
        margin-right: auto;
        gap: 30px;
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

    .cta {
        display: flex;
        align-items: center;
        margin-left: auto;
        gap: 30px;
    }

    form {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            display: block;
            width: 30px;
            height: 4px;
            background: $btn-primary;
            border-radius: $btn-border-radius-rounded;
            bottom: 0;
            right: 0;
            transform: translateX(45%) rotateZ(45deg);
        }
    }

    input {
        position: relative;
        background: white;
        z-index: 1;
        border: $btn-primary-border;
        border-radius: $btn-border-radius-rounded;
        padding: $search-padding;
        width: 30px;
        outline: none;
        transition: 
            color $transition-normal,
            width $transition-normal;

        &::placeholder {
          color: white;
        }

        &:hover, &:is(.is-active) {
            cursor: pointer;
            width: 200px;
        }
    }

    @media(max-width: $screen-extraLarge) {
        .cta, ul {
            display: none;
        }
    }
</style>