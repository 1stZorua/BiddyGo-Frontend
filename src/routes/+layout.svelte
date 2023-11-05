<script>
    import { onMount } from "svelte";
    import { scrollLock } from "../stores/scrollLockStore.ts";
    import { Header, Wrapper, Footer } from "../components/index.ts";
  
    onMount(() => {
        scrollLock.subscribe(
            () => document.body.setAttribute("data-scrollLock", $scrollLock ? "true" : "false")
        );
    });
</script>

<Wrapper>
    <Header></Header>
    <slot></slot>
</Wrapper>
<Footer></Footer>