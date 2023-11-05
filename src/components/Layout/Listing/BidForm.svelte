<script lang=ts>
	import type { Bid } from "$lib/types/types.ts";
    import { formatCurrency, sendRequest, placeBid } from "$lib/functions/index.ts";
    import { isModalOpen, openModalPromise, closeModalPromise, hubConnection } from "../../../stores/index.ts";
    import { calculateBidIncrements } from "$lib/functions/index.ts";
    import { SmallText, Input, OptionButton, PrimaryButton, Modal } from "../../index.ts";

    let bidValue = 0;

    function onBidClick(value: number) {
        bidValue = value;
    }

    async function onBidSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (!bidValue) return /*handle error here*/;
 
        const bid: Bid = {
            id: "",
            auction_listing_id: currentBid.auction_listing_id,
            bidder_id: 1,
            amount: bidValue,
            time: new Date(Date.now())
        }

        await openModalPromise();

        await sendRequest<Bid>(`/api/Bid`, "POST", bid);
        await placeBid($hubConnection, bid.auction_listing_id, +bid.amount)

        closeModalPromise();
    }

    function onConfirmBid() {
        closeModalPromise();
    }

    $: bidIncrements = calculateBidIncrements(currentBid.amount);

    export let active: boolean = true;
    export let currentBid: Bid;
</script>

<section>
    <form on:submit={onBidSubmit}>
        <Input 
            active={active} 
            inputType={"number"} 
            min={bidIncrements[0]} 
            name={"bidValue"}  
            placeholder="&euro; {bidIncrements[0]} or up" 
            value={bidValue}
            onInput={e => bidValue = e.target.value}
        ></Input>
        <div class="cta">
            <div>
                <OptionButton active={active} --small-width="100%" value={bidIncrements[0]} onClick={onBidClick}>&euro; {formatCurrency(bidIncrements[0])}</OptionButton>
            </div>
            <div>
                <OptionButton active={active} --small-width="100%" value={bidIncrements[1]} onClick={onBidClick}>&euro; {formatCurrency(bidIncrements[1])}</OptionButton>
            </div>
            <div>
                <PrimaryButton active={active} --small-width="100%" --primary="white" --secondary="black">Place Bid</PrimaryButton>
            </div>
        </div>
    </form>
    {#if $isModalOpen}
        <Modal>
            <span slot="type">Confirmation</span>
            <span slot="title">Review your bid</span>
            <div class="modal-content" slot="content">
                <div>
                    <SmallText>Your bid</SmallText>
                    <SmallText>Time left</SmallText>
                </div>
                <div>
                    <SmallText>&euro; {bidValue}</SmallText>
                    <SmallText>1d 9h 24m 17s</SmallText>
                </div>
            </div>
            <div class="modal-cta" slot="cta">
                <PrimaryButton --primary="black" --secondary="white" --small-width="100%" onClick={() => isModalOpen.set(false)}>Edit Bid</PrimaryButton>
                <PrimaryButton --primary="white" --secondary="black" --small-width="100%" onClick={onConfirmBid}>Confirm Bid</PrimaryButton>
            </div>
            <p slot="message">When you confirm your bid, it means you're committing to buy this item if you're the winning bidder.</p>
        </Modal>
    {/if}
</section>

<style lang=scss>
    form {
        display: flex;
        flex-direction: column;
        gap: $btn-gap;
        max-width: var(--form-width, 550px);

        .cta {
            display: flex;
            justify-content: space-between;
            gap: var(--button-gap, 0);

            > * {
                flex: 1;
            }
        }
    }

    .modal-content {
        display: flex;
        gap: 50px;
    }

    .modal-content div {
        display: flex;
        flex-direction: column;
    }

    .modal-cta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    @media (max-width: $screen-medium) { 
        form .cta {
            flex-wrap: wrap;
        }
    }
</style>