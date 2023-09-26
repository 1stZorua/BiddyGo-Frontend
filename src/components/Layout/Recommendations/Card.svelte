<script lang=ts>
    export let image : string;
	import FavoriteButton from "../../Shared/Buttons/Favorite.svelte";
</script>

<div class="card">
    <div class="button">
        <FavoriteButton></FavoriteButton>
    </div>
    <img src={image} alt="placeholder">
</div>

<style lang=scss>
    .card {
        position: relative;
        overflow: hidden;
        grid-area: var(--grid-area);
        border-radius: $btn-border-radius-normal;

        img:hover {
            cursor: pointer;
            scale: 1.25;
        }
    }

    .button {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition:
            scale $transition-normal;
    }
</style>
