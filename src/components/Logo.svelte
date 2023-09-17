<div class="logo">
    <a href="/">
        Biddy
    </a>
</div>

<style lang=scss>
    .logo {
        font-size: $logo-font-size;
        font-weight: $logo-font-weight;
        
        a {
            color: white;
            mix-blend-mode: difference;
        }

        &::after { 
            content: 'Go.';
            color: $logo-accent;
        }

        &:hover {
            cursor: pointer;
        }
    }
</style>
