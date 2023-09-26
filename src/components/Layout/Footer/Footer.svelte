<script>
	import Logo from "../../Shared/Objects/Logo.svelte";
	import SecondaryButton from "../../Shared/Buttons/Secondary.svelte";
	import NavigationSection from "./NavigationSection.svelte";
    import { navigationLinks } from "./config"
	
</script>

<section class="footer">
    <div class="container">
        <div class="navigation">
            {#each navigationLinks as section (section.title)}
                <NavigationSection title={section.title} links={section.links}></NavigationSection>
            {/each}
        </div>
        <div class="cta">
            <div class="select-wrapper">
                <select name="language">
                    <option value="english">English</option>
                </select>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="socials-wrapper">
                <div class="socials">
                    <SecondaryButton --color="white" --border-color="#B7B7B7">
                        <i class="fa-brands fa-facebook"></i>
                    </SecondaryButton>
                    <SecondaryButton --color="white" --border-color="#B7B7B7">
                        <i class="fa-brands fa-twitter"></i>
                    </SecondaryButton>
                    <SecondaryButton --color="white" --border-color="#B7B7B7">
                        <i class="fa-brands fa-pinterest"></i>
                    </SecondaryButton>
                    <SecondaryButton --color="white" --border-color="#B7B7B7">
                        <i class="fa-brands fa-instagram"></i>
                    </SecondaryButton>
                </div>
                <Logo></Logo>
            </div>
        </div>
        <div class="links">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Cookie Policy</span>
            <span>Responsible Disclosure</span>
            <span>&copy; Fontys 2023 - Milan de Haart</span>
        </div>
    </div>
</section>

<style lang=scss>
    .footer {
        display: flex;
        justify-content: center;
        width: 100%;
        background: $footer-background-color;
        margin-top: -120px;
    }

    .container {
        display: flex;
        flex-direction: column;
        gap: 150px;
        z-index: 10;
        margin: $wrapper-margin-normal;
        width: $screen-width;
        margin-block: 80px;
    }

    .navigation {
        display: flex;
        justify-content: space-between;
        color: white;
    }

    span {
        width: max-content;
        color: $gray-regular;
        transition: 
            color $transition-fast;

        &:hover {
            cursor: pointer;
            color: $gray-light;
        }
    }

    .cta {
        display: flex;
        justify-content: space-between;

        div:last-child {
            display: flex;
            gap: 100px;
        }
    }

    .cta .select-wrapper {
        position: relative;
        width: max-content;
        display: flex;
        align-items: center;

        &:hover {
            cursor: pointer;

            select {
                border-color: $btn-tertiary;
            }

            i {
                color: $gray-regular;
            }
        }
    }

    .cta .select-wrapper i {
        position: absolute;
        right: 20px;
        color: $accent-secondary;
        transition:
            color $transition-fast;
    }

    .cta .select-wrapper select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        font-size: $font-size-base;
        font-family: $font-family-primary;
        position: relative;
        color: $footer-base-color;
        background: none;
        height: $btn-height;
        padding-right: $btn-padding-inline * 2;
        border: $btn-border-size solid $gray-regular;
        padding-left: $btn-gap;
        padding-right: calc($btn-gap * 3);
        transition:
            border-color $transition-fast;
    }

    .socials-wrapper {
        align-items: center;
    }

    .socials {
        display: flex;
        gap: $btn-gap;
    }

    .links {
        display: flex;
        justify-content: space-between;

        &::before {
            content: '';
            position: absolute;
            display: inline-block;
            height: $line-height;
            background: $gray-dark;
            width: 100%;
            left: 0;
            translate: 0 -75px;
        }
    }

    @media (max-width: $screen-wide) {  
        .navigation {
            flex-wrap: wrap;
            gap: 50px;
        }
    }

    @media (max-width: $screen-extraLarge) {  
        .navigation {
            justify-content: normal;
        }

        .links {
            flex-direction: column;
            gap: $btn-gap;
        }
    }

    @media (max-width: $screen-large) {
        .cta {
            flex-direction: column;
            gap: 50px;
        }

        .socials-wrapper {
            justify-content: space-between;
        }
    }

    @media (max-width: $screen-medium) {
        .cta div:last-child {
            gap: 50px;
        }

        .socials-wrapper {
            flex-direction: column;
            align-items: flex-start;
        }

        .socials {
            flex-wrap: wrap;
            flex: 0 0 calc(40%);
        }
    }
</style>