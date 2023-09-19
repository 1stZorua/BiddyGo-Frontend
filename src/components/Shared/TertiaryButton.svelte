<button>
    <slot></slot>
</button>

<style lang=scss>
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: $btn-padding-inline;
        position: relative;
        z-index: 0;
        padding-right: $line-gap;
        font-family: $font-family-secondary;
        color: $btn-primary;
        background: $btn-secondary;
        border: none;
        text-transform: uppercase;
        font-weight: $font-weight-medium;
        transition: 
            color $transition-fast;
        
        &::before {
            content: '';
            position: absolute;
            z-index: -1;
            width: 100%;
            right: -$btn-padding-inline;
            height: $btn-height;
            padding-inline: $btn-padding-inline;
            background: $btn-secondary;
            border-right: calc($btn-border-size * 1.25) solid $btn-secondary;
            transition: 
                background $transition-fast,
                border-color $transition-fast;
        }

        &::after {
            content: '';
            position: absolute;
            right: -$btn-padding-inline;
            display: inline-block;
            width: $line-width;
            height: $line-height;
            background: $btn-primary;
            transition: 
                width $transition-fast;
        }

        &:hover {
            cursor: pointer;
            color: $btn-secondary;

            &::before {
                border-color: $btn-primary;
                background: $btn-quaternary;
            }

            &::after {
                width: 0px;
            }
        }
    }
</style>