<script>
    export let href = "#";
</script>

<a href={href}>
    <div>
        <slot name="icon"></slot>
    </div>
    <slot name="category"></slot>
</a>

<style lang=scss>
    a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        z-index: 0;
        overflow: hidden;
        min-width: calc($btn-height * 2.25);
        min-height: calc($btn-height * 2);
        color: $gray-dark;
        font-weight: $font-weight-bold;
        background: $btn-secondary;
        border: none;
        border-radius: $btn-border-radius-large 0 $btn-border-radius-large 0;
        transition: 
            color $transition-normal;
        
        &::before {
            content: '';
            position: absolute;
            translate: -110%;
            background: $accent-tertiary;
            z-index: -1;
            width: 110%;
            height: 110%;
            transition: 
                translate $transition-normal;
        }

        &:hover {
            cursor: pointer;
            color: $btn-secondary;

            &::before {
                translate: 0;
            }
        }
    }

    div {
        font-size: $font-size-heading;
    }
</style>