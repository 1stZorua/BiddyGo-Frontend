<script lang=ts>
    import { SecondaryText } from "../../index.ts";

    export let active: boolean = true;
    export let categories: Array<string> = [];
</script>

<div class="path">
    {#if active}
        <SecondaryText --color="#7A7A7A" --text-transform="normal">BiddyGo</SecondaryText>
    {/if}
    {#each categories as category}
        <SecondaryText active={active} --color="#B7B7B7" --text-transform="normal"> > {category} </SecondaryText>
    {/each}
</div>