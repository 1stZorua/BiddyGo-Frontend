<div class="logo">
    <a href="/">Biddy</a>
</div>

<style lang=scss>
    .logo {
        font-size: $logo-font-size;
        font-weight: $logo-font-weight;

        &:after { 
            content: 'Go.';
            position: absolute;
            color: $logo-accent;
        }

        &:hover {
            cursor: pointer;
        }
    }

    a {
        color: white;
        mix-blend-mode: difference;
    }
</style>
