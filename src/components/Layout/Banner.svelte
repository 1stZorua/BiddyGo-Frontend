<script>
    import PrimaryButton from "../Shared/PrimaryButton.svelte";
    import SecondaryButton from "../Shared/SecondaryButton.svelte";
	import Subtitle from "../Shared/Subtitle.svelte";
    import Square from "../Shared/Square.svelte";
	import SecondaryText from "../Shared/SecondaryText.svelte";
    import comic from '$lib/comic.png';
</script>

<section class="banner">
    <div class="container">
        <div class="text">
            <Subtitle>Auctioning quality items since 2023</Subtitle>
            <h1>A world of auctions awaits,</h1>
            <p>Bid confidently on our platform where every auction holds hidden treasures waiting for you to discover.</p>
            <div class="cta">
                <PrimaryButton --primary="white" --secondary="black">Start Bidding</PrimaryButton>
                <SecondaryButton text={"Become a Seller"}>
                    <i class="fa-solid fa-dollar-sign"></i>
                </SecondaryButton>
            </div>
        </div>
        <div class="display">
            <div class="slider-container">
                <div class="slider">
                    <div class="item"><img src={comic} alt="test"></div>
                    <div class="item"><img src={comic} alt="test"></div>
                    <div class="item"><img src={comic} alt="test"></div>
                    <div class="item"><img src={comic} alt="test"></div>
                    <div class="item"><img src={comic} alt="test"></div>
                </div>
                <div class="square-container">
                    <div class="element">
                        <i class="fa-solid fa-globe"></i>
                        <div class="square"></div>
                    </div>
                    <div class="element">
                        <Square --size="200px" --background="#1A5F7A" --radius="30px"></Square>
                    </div>
                    <div class="element">
                        <Square --size="100px" --background="#002B5B" --radius="20px"></Square>
                    </div>
                    <div class="element">
                        <div class="square">
                            <SecondaryText --color="white">Current bid</SecondaryText>
                            <span>$700</span>
                        </div>
                    </div>
                </div>
            </div>
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

            &::after {
                content: ' Dive in!';
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

    .slider-container {
        width: 500px;
        height: 650px;
        overflow: hidden;
    }

    .slider {
        height: 100%;
        //Change transform : translateY() here to shift slider items
    }
    
    .slider .item {
        height: 100%;
        position: relative;

        img {
            border-radius: $btn-border-radius-full; 
        }
    }
    
    .square-container .element {
        position: absolute;
        width: max-content;

        &:first-child {
            display: grid;
            place-items: center;
            right: -100px;
            top: 10px;

            .square {
                width: 125px;
                height: 125px;
                background: $accent-primary;
                border-radius: $btn-border-radius-small;
            }
            
            i {
                position: absolute;
                color: $icon-accent-primary;
                font-size: $font-size-heading;
                transition: 
                    color $transition-fast;

                &:hover {
                    cursor: pointer;
                    color: $icon-secondary;
                }
            }
        }

        &:nth-child(2) {
            bottom: -100px;
            right: -100px;
            z-index: -1;
        }

        &:nth-child(3) {
            bottom: -150px;
            right: 200px;
        }

        &:last-child {
            bottom: -75px;
            right: 360px;

            .square {
                display: grid;
                place-content: center;
                text-align: center;
                background: $accent-secondary;
                height: 250px;
                width: 250px;
                border-radius: $btn-border-radius-large;

                span {
                    font-size: $font-size-medium;
                    font-weight: $font-weight-bold;
                    color: $secondary;
                }
            }
        }
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

        .slider-container {
            width: 100%;
        }

        .slider .item {
            background: $gray-light;
            border-radius: $btn-border-radius-large;

            img {
                border-radius: $btn-border-radius-rounded;
                width: 100%;
                height: 100%;
                object-fit: scale-down;
            }
        }

        .square-container .element {
            &:first-child {
                top: 10px;
                right: -20px;
            }

            &:nth-child(2), &:nth-child(3) {
                display: none;
            }

            &:last-child {
                left: -20px;
                bottom: -20px;
            }
        }
    }

    @media(max-width: $screen-medium) {
        .display {
            overflow: hidden;
        }

        .square-container .element {
            &:first-child {
                top: 0;
                right: 0;
                .square {
                    border-radius: 0 $btn-border-radius-large 0 $btn-border-radius-large;
                }
            }

            &:last-child {
                width: 100%;
                bottom: 0;
                left: 0;
                .square {
                    height: 150px;
                    width: 100%;
                    border-radius: 0 0 $btn-border-radius-large $btn-border-radius-large;
                }
            }
        }

        .slider .item {
            background: none;
            
            img {
                object-fit: cover;
            }
        }
    }

    @media(max-width: $screen-small) {
        .cta {
            margin-top: $btn-gap;
            flex-direction: column-reverse;
        }

        .slider-container {
            height: 400px;
        }

        .square-container .element {
            &:first-child {
                display: none;
            }

            &:last-child .square {
                height: 100px;
            }
        }
    }
</style>