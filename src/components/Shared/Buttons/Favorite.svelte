<button>   
    <i class="fa-regular fa-heart"></i>
</button>

<style lang=scss>
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        background: $btn-secondary;
        color: $btn-primary;
        width: $btn-height;
        height: $btn-height;
        border-radius: $btn-border-radius-rounded;
        outline: $btn-border-size solid transparent;
        outline-offset: 5px;
        border: none;
        transition: 
            outline-color $transition-fast;

        &:hover {
            cursor: pointer;
            outline-color: $btn-secondary;

            i {
                font-weight: 800;
            }
        }
    }
</style>