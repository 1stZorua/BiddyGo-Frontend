<script lang=ts>
    import { FavoriteButton } from "../../index.ts";

    export let image : string;
</script>

<a href="/" class="card">
    <div class="button">
        <FavoriteButton></FavoriteButton>
    </div>
    <img src={image} alt="placeholder">
</a>

<style lang=scss>
    .card {
        position: relative;
        overflow: hidden;
        grid-area: var(--grid-area);
        border-radius: $btn-border-radius-normal;

        img:hover {
            cursor: pointer;
            scale: $transition-scale;
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
