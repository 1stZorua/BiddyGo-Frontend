<script>
    import SecondaryText from "../../Shared/Text/Secondary.svelte";
    /** @type {{
        image: string,
        title: string,
        current_bid: number,
        time_remaining: string
    }} */
    export let cardData;
</script>

<a href="/" class="card" draggable="false">
    <div class="display">
        <img src={cardData.image} alt={cardData.title} draggable="false">
    </div>
    <div class="text">
        <span class="title">{cardData.title}</span>
        <div>
            <SecondaryText --color="#7A7A7A">Current Bid</SecondaryText>
            <span class="current-bid">{cardData.current_bid}</span>
        </div>
        <span class="time-left">{cardData.time_remaining} left</span>
    </div>
</a>

<style lang=scss>

.card {
    display: block;
    width: 300px;
    overflow: hidden;
    border-radius: $btn-border-radius-normal $btn-border-radius-normal 0 0;

    &:hover {
        .display img {
            scale: $transition-scale;
        }
    }
}

.display {
    height: 350px;
    overflow: hidden;
    img {
        border-radius: $btn-border-radius-normal $btn-border-radius-normal 0 0;
        width: 100%;
        height: 100%;
        transition:
            scale $transition-normal;
    }
}

.text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    div {
        display: flex;
        flex-direction: column;
    }
}

.title {
    color: $primary;
    font-size: $font-size-small;
}

.current-bid {
    color: $primary;
    font-size: $font-size-medium;
    font-weight: $font-weight-medium;

    &::before {
        content: '€ ';
    }
}

.time-left {
    font-weight: $font-weight-medium;
    color: $gray-dark;
}

</style>