<script lang=ts>
    export let title: string;
    export let links: { name: string, href: string }[];
</script>

<div class="section">
    <h3>{title}</h3>
    {#each links as item (item)}
        <a href={item.href}>{item.name}</a>
    {/each}
</div>

<style lang=scss>
    .section {
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: $btn-gap;
        position: relative;
        height: max-content;
    }

    h3 {
        font-size: $font-size-small;
    }

    a {
        width: max-content;
        color: $gray-regular;
        transition: 
            color $transition-fast;

        &:hover {
            cursor: pointer;
            color: $gray-light;
        }
    }

    @media (max-width: $screen-wide) {  
        .section {
            flex: 0 0 calc(40%);
        }
    }

    @media (max-width: $screen-extraLarge) {  
        .section {
            flex: 0 0 calc(100%);
        }
    }
</style>