<script> 
    import { Subtitle, SecondaryText, Square } from "../../index.ts";
    import collaboration from "$lib/img/collaboration.png";
</script>

<section class="slogan">
    <div class="display">
        <div class="square-container">
            <div class="element">
                <Square --size="125px" --background="#159895" --radius="10px"></Square>
            </div>
            <div class="element">
                <a href="/">
                    <i class="fa-solid fa-thumbtack"></i>
                </a>
                <div class="square"></div>
            </div>
            <div class="element">
                <div class="square">
                    <SecondaryText --color="white">Total Biddies</SecondaryText>
                    <span>700K</span>
                </div>
            </div>
        </div>
        <img src={collaboration} alt="collaboration">
    </div>
    <div class="text">
        <Subtitle --line-color="white">Pioneering auction excellence</Subtitle>
        <div class="hero">
            <h1>Building Biddy<b>Go</b></h1>
            <h1>Together</h1>
        </div>
        <p>Collaboration and dedication have been at the heart of BiddyGo since day one. Join us in shaping the future of auctions, where every partnership leads to extraordinary opportunities.</p>
    </div>
</section>

<style lang=scss>
    .slogan {
        align-self: center;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: $section-height-normal;
        color: $secondary;

        &::before {
            content: '';
            position: absolute;
            background: $section-regular;
            width: 100%;
            z-index: -1;
            height: $section-height-normal;
            left: 0;
        }
    }

    .display {
        position: relative;
    }

    img {
        border-radius: $btn-border-radius-normal;
    }

    .square-container .element {
        position: absolute;
        width: max-content;

        &:first-child {
            top: -40px;
            left: -40px;
            z-index: -1;
        }
        
        &:nth-child(2) {
            display: grid;
            place-items: center;
            right: -50px;
            top: 30px;

            .square {
                width: 100px;
                height: 100px;
                background: $accent-quaternary;
                border-radius: $btn-border-radius-normal;
            }

            a {
                position: absolute;
            }

            i {
                color: $icon-accent-secondary;
                font-size: $font-size-heading;
                transition: 
                    color $transition-fast;

                &:hover {
                    cursor: pointer;
                    color: $icon-secondary;
                }
            }
        }

        &:last-child {
            right: -70px;
            bottom: -40px;

            .square {
                display: grid;
                place-content: center;
                text-align: center;
                background: $accent-tertiary;
                height: 200px;
                width: 200px;
                border-radius: $btn-border-radius-medium;
            }

            span {
                font-size: $font-size-medium;
                font-weight: $font-weight-bold;
            }
        }
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: $section-text-gap;
        color: $secondary;
        max-width: 42%;
    }
    
    .hero {
        display: flex;
        flex-direction: column;
    }

    h1  {
        font-size: $font-size-hero;

        b {
            color: $logo-accent;
        }

        &:last-child {
            color: $accent-tertiary;
        }
    }

    @media (max-width: $screen-wide) {
        .slogan {
            flex-direction: column;
            height: calc($section-height-normal * 0.75);

            &::before {
                background-image: url('$lib/img/collaboration.png');
                background-repeat: no-repeat;
                background-size: cover;
                height: calc($section-height-normal * 0.75);
            }   

            &::after {
                content: '';
                position: absolute;
                background: $section-regular;
                opacity: 0.8;
                width: 100%;
                height: calc($section-height-normal * 0.75);
                z-index: -1;
            }
        }

        .display {
            display: none;
        }

        .text {
            max-width: 100%;
        }

        h1 {
            b {
                color: $accent-tertiary;
            }

            &:last-child {
                color: $accent-quaternary;
            }
        }
    }
</style>