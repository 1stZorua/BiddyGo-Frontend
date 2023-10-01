<script>
	import Heading from "../../Shared/Text/Heading.svelte";
    import SecondaryText from "../../Shared/Text/Secondary.svelte";
    import Card from "./Card.svelte";
    import ptcg from "$lib/img/ptcg.png";
    import lpcm from "$lib/img/lpcm.png";
    import vgc from "$lib/img/vgc.png";
</script>

<section class="categories">
    <div class="text">
        <div class="route">
            <SecondaryText --color="#7A7A7A" --text-transform="normal">BiddyGo >&nbsp;</SecondaryText>
            <SecondaryText --color="#B7B7B7" --text-transform="normal">Entertainment, Cards & Games</SecondaryText>
        </div>
        <Heading>Entertainment, Cards & Games</Heading>
    </div>
    <div class="container">
        <Card categoryData={
            {
                image: ptcg, 
                title: "Pokemon & Trading Cards"
            }
        }></Card>
        <Card categoryData={
            {
                image: lpcm, 
                title: "LEGO & Pop Culture Merchandise"
            }
        }></Card>
        <Card categoryData={
            {
                image: vgc, 
                title: "Video Games & Computers"
            }
        }></Card>
    </div>
</section>

<style lang=scss>
    .categories {
        display: flex;
        flex-direction: column;
        gap: $section-text-gap;
    }

    .container {
        width: 100%;
        height: max-content;
        display: flex;
        flex-wrap: wrap;
        gap: 100px;
    }

    @media(max-width: $screen-extraLarge) {
        .container {
            gap: 50px;
        }
     }
</style>