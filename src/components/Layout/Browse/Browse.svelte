<script lang=ts>
    import Heading from "../../Shared/Text/Heading.svelte";
</script>

<section class="browse">
    <div class="text">
        <Heading>Browse By Categories</Heading>
        <p>Explore our diverse range of categories to find the perfect treasures that match your interests and preferences.</p>
    </div>
</section>

<style lang=scss>
    .browse {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        text-align: center;
        height: $section-height-small;

        &::before {
            content: '';
            position: absolute;
            background: $section-light;
            width: 100%;
            height: calc($section-height-small + $wrapper-gap * 2);
            left: 0;
            z-index: -1;
        }
    }
</style>