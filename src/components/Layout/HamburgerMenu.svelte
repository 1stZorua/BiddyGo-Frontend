<div>
    <span></span>
    <span></span>
    <span></span>
</div>

<style lang=scss>
    div {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        width: 30px;
        height: 20px;

        &::after {
            content: '';
            display: none;
            position: absolute;
            width: 150px;
            height: 150px;
            background: $accent-primary;
            bottom: 0;
            transform: translate(55%, -55%);
            border-radius: $btn-border-radius-large;
            transition: 
                transform $transition-fast;
            z-index: -1;
        }

        &:hover {
            span {
                background: white;
            }

            &::after {
                transform: translate(-25%, 25%);
            }
        }
    }

    span {
        height: $btn-border-size;
        background: $btn-primary;
        display: block;
        transition: background $transition-fast;

        &:first-child {
            width: 60%;
        }

        &:last-child {
            width: 60%;
            align-self: end;
        }
    }

    @media(max-width: $screen-extraLarge) {
        div {
            display: flex;
        }   
    }
</style>