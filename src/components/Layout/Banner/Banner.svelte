<script>
    import { PrimaryButton, SecondaryButton, Subtitle } from "../../index.ts"
    import Slider from "./Slider.svelte";
</script>

<section class="banner">
    <div class="container">
        <div class="text">
            <Subtitle>Auctioning quality items since 2023</Subtitle>
            <h1>A world of auctions awaits, <b>Dive in!</b></h1>
            <p>Bid confidently on our platform where every auction holds hidden treasures waiting for you to discover.</p>
            <div class="cta">
                <PrimaryButton --color="white" --background-color="black" --mobile-width="100%">Start Bidding</PrimaryButton>
                <SecondaryButton text={"Become a Seller"}>
                    <i class="fa-solid fa-dollar-sign"></i>
                </SecondaryButton>
            </div>
        </div>
        <div class="display">
            <Slider></Slider>
        </div>
    </div>
</section>

<style lang=scss>
    .banner {
        color: $primary;
    }

    .banner .container {
        display: flex;
        align-items: center;
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: $section-text-gap;
        flex: 0.75;
        min-width: 50%;

        h1 {
            line-height: 1.25;
            font-size: $font-size-hero;

            b {
                color: $accent-primary;
            }
        }
    }

    .cta {
        margin-top: calc($btn-gap * 2);
        display: flex;
        gap: $btn-gap;
    }

    .display {
        flex: 1;
        display: flex;
        justify-content: end;
        position: relative;
        height: max-content;
        width: max-content;
        margin-right: 100px;
    }

    @media (max-width: $screen-wide) {
        .banner .container {
            flex-direction: column-reverse;
            gap: 100px;
        }

        .text {
            align-self: start;
        }

        .display {
            width: 100%;
            margin-right: 0;
        }
    }

    @media(max-width: $screen-medium) {
        .display {
            overflow: hidden;
        }
    }

    @media(max-width: $screen-small) {
        .cta {
            margin-top: $btn-gap;
            flex-direction: column-reverse;
        }
    }
</style>