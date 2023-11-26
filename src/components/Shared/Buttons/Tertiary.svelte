<script lang=ts>
	import { Subheading } from "../../index.ts";

    export let active: boolean = true;
    export let link: string ="/";
</script>

{#if active}
    <a rel="external" href={link}>
        <slot></slot>
        <i class="fa-solid fa-arrow-right-long"></i>
    </a>
{:else}
    <Subheading active={active}>
        <slot></slot>
        <span>ic</span>
    </Subheading>
{/if}

<style lang=scss>
    a {
        display: flex;
        align-items: center;
        gap: $line-gap;
        position: relative;
        z-index: 0;
        height: $btn-height;
        width: max-content;
        white-space: nowrap;
        font-family: $font-family-secondary;
        color: var(--color, $btn-primary);
        text-transform: uppercase;
        font-weight: $font-weight-medium;;
        transition: 
            color $transition-fast;

        i {
            color: var(--color, $btn-primary);
            font-size: $font-size-medium;
            animation: 
                arrow $transition-duration linear infinite paused;
        }
        
        &:hover {
            cursor: pointer;

            i {
                animation-play-state: running;
            }
        }
    }

    @keyframes arrow {
        0% {
            translate: 0;
        }
        50% {
            translate: 15px;
        }
        100% {
            translate: 0;
        }
    }
</style>