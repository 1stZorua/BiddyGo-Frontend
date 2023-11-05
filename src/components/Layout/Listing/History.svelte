<script lang=ts>
    import { fly } from "svelte/transition";
    import { backOut } from "svelte/easing";
    import type { Bid } from "$lib/types/types.ts";
    import { formatCurrency } from "$lib/functions";
    import { MediumText, Subheading } from "../../index.ts";
    import flag_netherlands from "$lib/img/flag_netherlands.svg";

    let seeAllBids: boolean = false;

    function onSeeAllBidsClick() {
        seeAllBids = !seeAllBids;
    }

    export let bids : Bid[];
</script>

<section>
    <Subheading --font-weight="500">Bid History</Subheading>
    <table>
        <tbody>
            {#each [...bids].reverse().slice(0, 3) as bid, index}
                <tr>
                    <td>
                        <div class="bidder">
                            <img src={flag_netherlands} alt="origin">
                            <MediumText --font-weight={index === 0 ? "600" : "400"}>Bidder {bid.bidder_id}</MediumText>
                        </div>
                    </td>
                    <div>
                        <td>
                            <MediumText --font-weight={index === 0 ? "600" : "400"}>{index + 1} h ago</MediumText>
                        </td>
                        <td>
                            <MediumText --font-weight={index === 0 ? "600" : "400"}>&euro;{formatCurrency(bid.amount)}</MediumText>
                        </td>
                    </div>
                </tr>
            {/each}
        </tbody>
        <button on:click={onSeeAllBidsClick}>
            <MediumText>See all bids ({bids.length})</MediumText>
            <i class="fa-solid fa-chevron-down"></i>
        </button>
        {#if seeAllBids}
            <tbody 
                class="other__bids" 
                transition:fly={{ y: -50, easing: backOut }}      
            >
                {#each [...bids].reverse().slice(3, bids.length) as bid}
                    <tr>
                        <td>
                            <div class="bidder">
                                <img src={flag_netherlands} alt="origin">
                                <MediumText --font-weight="400">Bidder {bid.bidder_id}</MediumText>
                            </div>
                        </td>
                        <div>
                            <td>
                                <MediumText --font-weight="400">4 h ago</MediumText>
                            </td>
                            <td>
                                <MediumText --font-weight="400">&euro;{formatCurrency(bid.amount)}</MediumText>
                            </td>
                        </div>
                    </tr>
                {/each}
            </tbody>
        {/if}
    </table>
</section>

<style lang=scss>
    section {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .bidder {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
            width: 30px;
            height: max-content;
            border: $btn-option-border;
        }
    }

    tr > div {
        display: flex;
        justify-content: space-between;
        
        >:first-child {
            margin-right: 100px;
        }
    }

    button {
        display: flex;
        align-items: center;
        gap: 10px;
        background: none;
        border: none;
        margin-block: 30px;
        transition:
            opacity $transition-fast;

        &:hover {
            cursor: pointer;
            opacity: 0.5;
        }
    }
</style>