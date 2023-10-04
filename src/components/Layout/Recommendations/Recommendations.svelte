<script>
    import Heading from "../../Shared/Text/Heading.svelte";
    import TertiaryButton from "../../Shared/Buttons/Tertiary.svelte";
    import Card from "./Card.svelte";
    import ring from '$lib/img/ring.png';
    import bank from '$lib/img/bank.png';
    import car from '$lib/img/car.png';
    import coin from '$lib/img/coin.png';
    import controller from '$lib/img/controller.png';
    import pokemon from '$lib/img/pokemon.png';
</script>

<section class="recommendations">
    <div class="text">
        <Heading>Daily Recommendations</Heading>
        <div class="separator">
            <p>Experience daily-refreshed, personalized discoveries on BiddyGo as you log in.</p>
            <TertiaryButton>View All</TertiaryButton>
        </div>
    </div>
    <div class="content">
        <Card image={bank} --grid-area="a"></Card>
        <Card image={car} --grid-area="b"></Card>
        <Card image={pokemon} --grid-area="c"></Card>
        <Card image={coin} --grid-area="d"></Card>
        <Card image={controller} --grid-area="e"></Card>
        <Card image={ring} --grid-area="f"></Card>
      </div>
</section>

<style lang=scss>
    .recommendations {
        display: flex;
        flex-direction: column;
        gap: $btn-gap;
        margin-top: $section-margin-top-medium;
        margin-bottom: $section-margin-top-regular;
    }

    .separator {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: $btn-gap;
    }

    .content {
        display: grid;
        gap: 30px;
        grid-template-areas: 
            "a a a a b b b c c" 
            "d d e e b b b f f";
        height: 625px;
    }

    @media(max-width: $screen-extraLarge) {
        .recommendations {
            margin-top: $section-margin-top-small;
        }

        .separator {
            flex-direction: column;
            align-items: start;
        }

        .content {
            grid-template-areas:
                "a a b b" 
                "d e b b"
                "c e f f";
        }
    }

    @media(max-width: $screen-large) { 
        .content {
            grid-template-areas:
                "a b" 
                "c d"
                "e f"; 
            height: 1100px;
        }
    }

    @media(max-width: $screen-small) { 
        .content {
            grid-template-areas:
                "a" 
                "b"
                "c"
                "d"
                "e"
                "f"; 
            height: 2000px;
        }
    }
</style>