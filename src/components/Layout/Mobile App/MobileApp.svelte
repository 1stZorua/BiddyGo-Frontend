<script>
    import { Heading } from "../../index.ts";
    import appstore from "$lib/img/appstore.png";
    import playstore from "$lib/img/playstore.png";
    import laptop from "$lib/img/laptop.png";
    import mobile from "$lib/img/mobile.png";
</script>

<section class="mobile-app">
    <div class="text">
        <div>
            <Heading>The BiddyGo-app</Heading>
            <p>Explore the extraordinary at your fingertips, whenever, wherever.</p>
        </div>
        <div class="buttons">
            <a href="/">
                <img src={appstore} alt="app store">
            </a>
            <a href="/">
                <img src={playstore} alt="google play">
            </a>
        </div>
    </div>
    <div class="display">
        <div class="mockups">
            <img src={mobile} alt="mobile">
            <img src={laptop} alt="mobile">
        </div>
    </div>
</section>

<style lang=scss>
    .mobile-app {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: $section-height-small * 2;
        margin-bottom: -240px;
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: $section-text-gap;
        flex: 1;
    }

    .buttons {
        display: flex;
        gap: $btn-gap;
    }

    .display {
        display: flex;
        align-items: center;
        flex: 0.2;

        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 135px;
            background: $section-dark;
            border-radius: $btn-border-radius-normal 0 0 $btn-border-radius-normal;
            z-index: -1;
        }
    }

    .mockups {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
        margin-left: 50px;
        gap: 100px;

        img {
            height: 100%;
        }
    }

    @media (max-width: $screen-wide) {
        .mobile-app {
            flex-direction: column;
            gap: 150px;
            height: max-content;
            margin-top: 100px;
            align-items: flex-start;
        }

        .display::after {
            left: 0;
            border-radius: 0;
        }
    }

    @media(max-width: $screen-large) {
        .display {
            width: 100%;
        }

        .mockups {
            margin-left: 0;

            img:last-child {
                display: none;
            }
        }
    }

    @media(max-width: $screen-small) {
        .mobile-app {
            margin-top: 20px;
            gap: 100px;
        }

        .text {
            text-align: center;
        }

        .buttons {
            flex-direction: column;

            img {
                width: 180px;
            }
        }
    }
</style>