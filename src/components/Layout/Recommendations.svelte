<script>
    import Heading from "../Shared/Heading.svelte";
    import TertiaryButton from "../Shared/TertiaryButton.svelte";
    import RecommendationCard from "../Shared/RecommendationCard.svelte";
    import comic from '$lib/comic.png';
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
        <RecommendationCard image={comic} --grid-area="a"></RecommendationCard>
        <RecommendationCard image={comic} --grid-area="b"></RecommendationCard>
        <RecommendationCard image={comic} --grid-area="c"></RecommendationCard>
        <RecommendationCard image={comic} --grid-area="d"></RecommendationCard>
        <RecommendationCard image={comic} --grid-area="e"></RecommendationCard>
        <RecommendationCard image={comic} --grid-area="f"></RecommendationCard>
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