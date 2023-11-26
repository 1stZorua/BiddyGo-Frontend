<script lang=ts>
	import type { Bid, RemainingTime } from "$lib/types/types.ts";
    import { formatCurrency, sendRequest, placeBid } from "$lib/functions/index.ts";
    import { isModalOpen, openModalPromise, closeModalPromise, hubConnection } from "../../../stores/index.ts";
    import { calculateBidIncrements } from "$lib/functions/index.ts";
    import { SmallText, Input, OptionButton, PrimaryButton, Modal } from "../../index.ts";
	import { superForm } from "sveltekit-superforms/client";
    import type { SuperValidated } from "sveltekit-superforms";
    import type { BidSchema } from "$lib/schemas/bid.ts";
    import { getFlash } from "sveltekit-flash-message/client";
    import { page } from "$app/stores";

    const flash = getFlash(page);

    export let active: boolean = true;
    export let currentBid: Bid;
    export let auctionListingId: number | undefined;
    export let pageModal: boolean = false;
    export let formData: SuperValidated<BidSchema>;
    export let remainingTime: RemainingTime;

    const { form, errors, enhance, constraints } = superForm(formData, {
        id: `bid_${pageModal}`
    });

    $: bidIncrements = calculateBidIncrements(currentBid.amount);

    function onBidClick(value: number) {
        $form.amount = value;
    }

    async function onBidSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
            flash.set({type: "error", message: "The auction listing has concluded."})
            return;
        }

        if (!$page.data.user) {
            flash.set({type: "error", message: "You need to be logged in to place a bid."});
            return;
        }

        if (!$form.amount) return;
        
        await openModalPromise();
    }

    async function onConfirmBid() {
        if ($page.data.user) {
            if ($form.amount > currentBid.amount) {
                const bid: Bid = {
                    id: "",
                    auction_listing_id: auctionListingId!,
                    bidder_id: Number($page.data.user.id),
                    amount: Number($form.amount),
                    time: new Date(Date.now())
                }

                await sendRequest(`/api/Bid`, "POST", bid);
                await placeBid($hubConnection, bid.auction_listing_id, bid.bidder_id, +bid.amount);

                flash.set({type: "success", message: `Placed bid of \u20AC${formatCurrency(bid.amount)}.`});
            } else {
                flash.set({type: "error", message: `A bid with this amount has already been placed`});
            }
        } else {
            flash.set({type: "error", message: "Internal error whilst fetching user data."})
        }
        closeModalPromise();
    }
</script>

<section>
    <form method="post" action="?/bid" on:submit={onBidSubmit} use:enhance>
        <Input 
            active={active} 
            label="&euro; {bidIncrements[0]} or up" 
            type="number"
            name="amount" 
            min={bidIncrements[0]}
            error={$errors.amount} 
            errorLocation="up"
            {...$constraints.amount}
            
            bind:value={$form.amount}
        ></Input>
        <div class="cta">
            <div>
                <OptionButton active={active} --width="100%"  --small-width="100%" value={bidIncrements[0]} onClick={onBidClick}>&euro; {formatCurrency(bidIncrements[0])}</OptionButton>
            </div>
            <div>
                <OptionButton active={active} --width="100%" --small-width="100%" value={bidIncrements[1]} onClick={onBidClick}>&euro; {formatCurrency(bidIncrements[1])}</OptionButton>
            </div>
            <div>
                <PrimaryButton active={active} --width="100%" --small-width="100%" --color="white" --background-color="black">Place Bid</PrimaryButton>
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
                    <SmallText>&euro; {formatCurrency(Number($form.amount))}</SmallText>
                    <SmallText>1d 9h 24m 17s</SmallText>
                </div>
            </div>
            <div class="modal-cta" slot="cta">
                <PrimaryButton --small-width="100%" onClick={() => isModalOpen.set(false)}>Edit Bid</PrimaryButton>
                <PrimaryButton --color="white" --background-color="black" --small-width="100%" onClick={onConfirmBid}>Confirm Bid</PrimaryButton>
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
        max-width: var(--form-width, 600px);

        .cta {
            display: flex;
            justify-content: space-between;
            gap: 20px;

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