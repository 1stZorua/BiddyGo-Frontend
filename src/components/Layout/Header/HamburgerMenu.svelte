<script lang=ts>
    import { headerLinks } from './config';

    let toggled: boolean = false;
</script>

<div class="container">
    <button class:toggled={toggled} on:click={
        () => { 
            toggled = !toggled 
            document.querySelector("body")?.classList.toggle("menu-opened", toggled);
        }
    }>
        <span></span>
        <span></span>
        <span></span>
    </button>

    <div class="menu" class:toggled={toggled}>
        <ul>
            {#each headerLinks as link (link)}
                <li><a href={link.href}>{link.name}</a></li>
            {/each}
        </ul>
    </div>
</div>

<style lang=scss>
    .container {
        display: none;
        z-index: 2;
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
            cursor: pointer;
            
            span {
                background: $secondary;
            }

            &::after {
                transform: translate(-25%, 25%);
            }
        }
    }

    button.toggled {
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

        &::after {
            transform: translate(-25%, 25%);
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
        width: 100%;
        translate: 100%;
        left: 0;
        top: 0;
        transition:
            translate $transition-normal;
        background: $secondary;
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
    
    .menu.toggled {
        translate: 0;
    }

    @media(max-width: $screen-extraLarge) {
        .container {
            display: block;
        }
    }
</style>