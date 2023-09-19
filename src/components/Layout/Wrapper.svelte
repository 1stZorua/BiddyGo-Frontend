<main><slot></slot></main>

<style lang=scss>
    main {
        display: flex;
        flex-direction: column;
        gap: $wrapper-gap;
        width: $screen-width;
        margin: $wrapper-margin;
    }
</style>