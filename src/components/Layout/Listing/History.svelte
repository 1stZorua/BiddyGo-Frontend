<script lang=ts>
    import { fly } from "svelte/transition";
    import { backOut } from "svelte/easing";
    import type { Bid } from "$lib/types/types.ts";
    import { formatCurrency } from "$lib/functions";
    import { MediumText, SmallText, Subheading } from "../../index.ts";
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
                            <SmallText --font-weight={index === 0 ? "600" : "400"}>Bidder {bid.bidder_id}</SmallText>
                        </div>
                    </td>
                    <td>
                        <SmallText --font-weight={index === 0 ? "600" : "400"}>{index + 1} h ago</SmallText>
                    </td>
                    <td>
                        <SmallText --font-weight={index === 0 ? "600" : "400"}>&euro;{formatCurrency(bid.amount)}</SmallText>
                    </td>
                </tr>
            {/each}
        </tbody>
        <button on:click={onSeeAllBidsClick}>
            <MediumText>See all bids ({bids.length > 3 ? bids.length : 0})</MediumText>
            <i class="fa-solid fa-chevron-down"></i>
        </button>
        {#if seeAllBids}
            <tbody 
                class="other__bids" 
                transition:fly={{ y: -50, easing: backOut }}      
            >
                {#each [...bids].reverse().slice(3, bids.length) as bid, index}
                    <tr>
                        <td>
                            <div class="bidder">
                                <img src={flag_netherlands} alt="origin">
                                <SmallText --font-weight="400">Bidder {bid.bidder_id}{index}</SmallText>
                            </div>
                        </td>
                        <td>
                            <SmallText --font-weight="400">41 h ago</SmallText>
                        </td>
                        <td>
                            <SmallText --font-weight="400">&euro;{formatCurrency(bid.amount)}</SmallText>
                        </td>
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
        gap: 5px;

        img {
            width: 30px;
            height: max-content;
            border: $btn-option-border;
        }
    }

    tbody {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    tr {
        display: flex;
        align-items: center;
        
        td {
            vertical-align: middle;
            white-space: nowrap;

            &:first-child {
                width: 35%;
            }

            &:nth-child(2) {
                text-align: left;
                width: 35%;
            }

            &:last-child {
                margin-left: auto;
            }
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

    @media (max-width: $screen-wide) {
        tr td:first-child {
            width: 50%;
        }
    }
</style>