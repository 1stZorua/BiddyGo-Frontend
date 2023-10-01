<script lang>
    import SecondaryText from "../../Shared/Text/Secondary.svelte";
    /** @type {{
        image: string,
        title: string
    }} */
    export let categoryData;

    let color = '#FBB763';

</script>

<a href="/" class="card" style="--color: {color};">
    <div class="top">
        <SecondaryText --color="white" --text-transform="none">
            {categoryData.title}
        </SecondaryText>
    </div>
    <div class="right">
        <img src={categoryData.image} alt={categoryData.title}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 210">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M172 0H0V212H172V0ZM86 166C119.137 166 146 139.137 146 106C146 72.8629 119.137 46 86 46C52.8629 46 26 72.8629 26 106C26 139.137 52.8629 166 86 166Z" fill={color}/>
        </svg>
    </div>
</a>

<style lang=scss>
    .card {
        position: relative;
        display: flex;
        padding: 20px;
        height: 210px;
        min-width: 450px;
        background: $card-background-color;
        border-radius: $btn-border-radius-normal;

        &::before {
            content: '';
            position: absolute;
            height: 40%;
            width: 100%;
            bottom: 0;
            left: 0;
            background-image: url("$lib/img/overlay.png");
            mix-blend-mode: soft-light;
            border-radius: 0 0 $btn-border-radius-normal $btn-border-radius-normal;
            z-index: 1;
        }

        &:hover {
            cursor: pointer;

            .right img {
                scale: calc($transition-scale + 0.5);
            }
        }
    }

    .top {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 65%;
        height: 100%;
        position: relative;
    }

    .right {
        display: flex;
        justify-content: center;
        align-items: end;
        position: absolute;
        right: -40px;
        bottom: -20px;
        width: 170px;
        height: 100%;
        border-radius: $btn-border-radius-small;
        overflow: hidden;
        z-index: 1;
        margin-right: -2px;

        img {
            width: 100%;
            height: 75%;
            scale: calc($transition-scale + 0.25);
            position: absolute;
            object-fit: contain;
            transition:
                scale $transition-normal;
        }

        svg {
            position: relative;
        }
    }

    @media(max-width: $screen-extraLarge) {
        .card {
            width: 100%;
            min-width: 0;
        }

        .right {
            right: 0;
            bottom: 0;
            border-radius: 0 $btn-border-radius-normal $btn-border-radius-normal 0;
        }
    }

    @media(max-width: $screen-small) {
        .card::after {
            content: '';
            position: absolute;
            height: 40%;
            width: 100%;
            padding-top: 2px;
            bottom: -2px;
            left: 0;
            background: var(--color);
            border-radius: 0 0 $btn-border-radius-normal $btn-border-radius-normal;
            z-index: 0;
        }

        .top {
            width: 100%;
        }

        .right { 
            img {
                display: none;
            }

            svg {
                display: none;
            }
        }
     }
</style>