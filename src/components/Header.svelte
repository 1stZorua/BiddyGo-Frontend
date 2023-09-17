<script lang=ts>
    import Logo from '../components/Logo.svelte';
	import PrimaryButton from './PrimaryButton.svelte';

    let searchElement : HTMLInputElement;

    function handleSearchClick() {
        searchElement.classList.toggle('is-active');
    }
</script>

<header>
    <nav>
        <Logo></Logo>
        <ul class="links">
            <li><a href="/">Home</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Contact</a></li>
            <li><a href="/">News</a></li>
        </ul>
        <div class="cta">
            <form>
                <input 
                    type="search" 
                    name="search" 
                    placeholder="Search..." 
                    bind:this={searchElement}
                    on:click={handleSearchClick}
                >
            </form>
            <PrimaryButton>Sign In</PrimaryButton>
        </div>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>
</header>

<style lang=scss>
    nav {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;
    }

    ul {
        list-style: none;
        display: flex;
        margin-right: auto;
        gap: 30px;

        @media(max-width: $screen-extraLarge) {
            display: none;
        }
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

        @media(max-width: $screen-extraLarge) {
            display: none;
        }
    }

    form {
        position: relative;
    }

    form::after {
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

    input {
        position: relative;
        background: white;
        z-index: 1;
        border: $btn-border;
        border-radius: $btn-border-radius-rounded;
        padding: $icon-padding;
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

    .hamburger {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        width: 30px;
        height: 20px;

        &::after {
            content: '';
            position: absolute;
            width: 150px;
            height: 150px;
            background: $accent-primary;
            bottom: 0;
            transform: translate(55%, -55%);
            border-radius: $btn-border-radius-large;
            transition: 
                transform $transition-fast;
            z-index: -1;
        }

        &:hover {
            span {
                background: white;
            }

            &::after {
                transform: translate(-25%, 25%);
            }
        }

        @media(max-width: $screen-extraLarge) {
            display: flex;
        }
    }

    span {
        height: $btn-border-size;
        background: $btn-primary;
        display: block;
        transition: background $transition-fast;

        &:first-child {
            width: 60%;
        }

        &:last-child {
            width: 60%;
            align-self: end;
        }
    }
</style>