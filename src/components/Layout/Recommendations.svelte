<script>
    import Heading from "../Shared/Heading.svelte";
    import TertiaryButton from "../Shared/TertiaryButton.svelte";
</script>

<section class="recommendations">
    <div class="text">
        <Heading>Daily Recommendations</Heading>
        <div class="separator">
            <p>Experience daily-refreshed, personalized discoveries on BiddyGo as you log in.</p>
            <!-- <TertiaryButton>View All</TertiaryButton> -->
        </div>
    </div>
</section>

<style lang=scss>
    .recommendations {
        margin-top: 220px;
    }

    .separator {
        position: relative;
        display: flex;
        justify-content: space-between;
    }

    @media(max-width: $screen-extraLarge) {
        
    }
</style>