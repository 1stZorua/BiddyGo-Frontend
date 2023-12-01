<script lang=ts>
    import { onMount } from "svelte";
    import { FilterButton } from "../../index.ts";

    export let active: boolean = true;
    export let sections: string[] = [];

    let activeButton: number = 0;
    let tablistContent: HTMLDivElement;
    let content: Array<HTMLDivElement>;

    function onTabClick(index: number) {
        if (index === activeButton) return;

        activeButton = index;
        content.forEach((c, i) => {
            if (i === index) {
                c.classList.remove("hidden");
                return;
            }
            c.classList.add("hidden");
        });
    }

    onMount(() => {
        content = Array.from(tablistContent.querySelectorAll(".content > div"));
    });
</script>

<div class="information">
    <div class="tablist">
        {#each sections as tab, index}
            <button on:click={() => onTabClick(index)}>
                <FilterButton active={active} activeButton={activeButton} number={index} onClick={onTabClick}>
                    {tab}
                </FilterButton>
            </button>
        {/each}
    </div>
    <div 
        class="content"
        bind:this={tablistContent} 
    >
        <slot></slot>
    </div>
</div>

<style lang=scss>
    .information {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .tablist {
        display: flex;
        flex-wrap: wrap;
        gap: $btn-gap;
    }

    .tablist button {
        flex: 1;
        border: none;
        background: none;
    }
</style>