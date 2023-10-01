<script>
    import { page } from "$app/stores";
	import Categories from "../../../components/Layout/Category/Categories.svelte";
    import Slider from "../../../components/Layout/Listing/Slider.svelte";
    import { data } from "../../../components/Layout/Listing/data.js";
    const categoryId = $page.params.categoryId;
</script>

<Categories></Categories>
{#each data as category}
    <Slider category={category}></Slider>
{/each}