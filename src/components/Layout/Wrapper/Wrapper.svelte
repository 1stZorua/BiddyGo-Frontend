<main><slot></slot></main>

<style lang=scss>
    main {
        display: flex;
        flex-direction: column;
        gap: $wrapper-gap;
        margin: $wrapper-margin-normal;
        max-width: $screen-width;
        height: max-content;
    }

    @media (max-width: $screen-medium) {
        main {
            margin: $wrapper-margin-small;
        }
    }
</style>