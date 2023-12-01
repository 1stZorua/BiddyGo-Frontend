<script lang=ts>
	import { afterNavigate } from "$app/navigation";
    import { page } from "$app/stores";
	import type { AuctionListing, ViewSubCategoryData } from "$lib/types/types.ts";
    import { Path, Heading, MediumText, SmallText, Listing } from "../../../../components/index.ts";

    export let data: ViewSubCategoryData;

    let loaded: boolean = false;
    let format: "grid" | "lines" = "grid";
    let sort: boolean = false;
    let pageSize = 10;
    let auctionListings : AuctionListing[];

    $: auctionListings = sort ? data.auctionListings.data.toReversed() : data.auctionListings.data;
    $: totalItems = data.auctionListings.totalCount;
    $: totalPages = Math.ceil(totalItems / pageSize);
    $: currentPage = (Number($page.url.searchParams.get("page")) || 0);

    const { categoryId, subCategoryId } = $page.params;

    afterNavigate(() => loaded = true);
</script>

<section>
    <div>
        <Path 
            active={loaded} 
            categories={
                loaded 
                ? [categoryId, subCategoryId]
                : ["BiddyGo > Entertainment, Cards & Games > Pokemon & Trading Cards"]
            }>
        </Path>
        <Heading active={loaded}>{data.subCategory.name}</Heading>
    </div>
    <div>
        <MediumText active={loaded}>{data.auctionListings.totalCount} objects</MediumText>
        <div class="sort">
            <SmallText>
                <button on:click={() => sort = !sort}>
                    <span>
                        Sort by <b style="color:#159895; font-weight:500">time remaining</b>
                    </span>
                    <i 
                        class="fa solid"
                        class:fa-chevron-up={sort}
                        class:fa-chevron-down={!sort}
                        style="color:#159895"
                    ></i>
                </button>
            </SmallText>
            <div class="icons">
                <button on:click={() => format="grid"}>
                    <i class="fa-solid fa-grip-vertical"></i>
                </button>
                <button on:click={() => format="lines"}>
                    <i class="fa-solid fa-grip-lines"></i>
                </button>
            </div>
        </div>
    </div>
    <div 
        class="items"
        class:lines={format === "lines"}
    >
        {#each auctionListings as auctionListing}
            <div class="item">
                <Listing --width="100%" {format} {auctionListing}></Listing>
            </div>
        {/each}
    </div>
    {#if totalPages > 1}
        <div class="pagination">
            {#each Array(totalPages) as _, index}
                <a 
                    href="/c/{categoryId}/{subCategoryId}?page={index + 1}"
                >
                    <SmallText --color={currentPage === index + 1 ? "#159895" : ""}>{index + 1}</SmallText>
                </a>
            {/each}
        </div>
    {/if}
</section>

<style lang=scss>
    section {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .sort {
        display: flex;
        justify-content: space-between;
    }

    .sort .icons {
        display: flex;
        gap: 15px;
    }

    .items {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 25px;
    }

    .items.lines {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .item {
        display: flex;
    }

    .pagination {
        display: flex;
        gap: 30px;
        align-self: center;
    }
</style>