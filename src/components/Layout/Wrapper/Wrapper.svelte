<main><slot></slot></main>

<style lang=scss>
    main {
        display: flex;
        flex-direction: column;
        gap: $wrapper-gap;
        margin: $wrapper-margin-normal;
        max-width: $screen-width;
        width: calc(100% - $wrapper-margin-inline-normal * 2);
        height: max-content;
    }

    @media (max-width: $screen-medium) {
        main {
            width: calc(100% - $wrapper-margin-inline-small * 2);
        }
    }
</style>