<script lang=ts>
	import type { IndexData } from "$lib/types/types.ts";
    import { Banner, Recommendations, Browse, Slogan, MobileApp } from "../components/index.ts";

    export let data: IndexData;
</script>

<Banner auctionListing={data.latestAuctionListing.data[0]}></Banner>
<Recommendations></Recommendations>
<Browse categories={data.categories.data}></Browse>
<Slogan></Slogan>
<MobileApp></MobileApp>