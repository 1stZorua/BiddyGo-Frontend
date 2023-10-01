<div class="logo">
    <a href="/">
        <div>Biddy</div>
        <div>Go</div>
    </a>
</div>

<style lang=scss>
    .logo {
        background: var(--background);
        position: relative;
        z-index: 3;
        font-size: $logo-font-size;
        font-weight: $logo-font-weight;

        &:hover {
            cursor: pointer;
        }
    }

    a {
        display: flex;
        div {
            &:first-child {
                color: white;
                mix-blend-mode: difference;
            }
    
            &:last-child {
                color: $logo-accent;
            }
        }
    }
</style>
