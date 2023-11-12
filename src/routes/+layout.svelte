<script>
    import { onMount } from "svelte";
    import { scrollLock } from "../stores/scrollLockStore.ts";
    import { Header, Wrapper, Footer } from "../components/index.ts";
    import { getFlash } from "sveltekit-flash-message/client";
    import { page } from "$app/stores";
    import toast, { Toaster } from "svelte-french-toast";

    const flash = getFlash(page);

    $: if ($flash) {
        switch ($flash.type) {
            case "success":
                toast.success($flash.message);
                break;
            case "error":
                toast.error($flash.message);
                break;
        }
    }
  
    onMount(() => {
        scrollLock.subscribe(
            () => document.body.setAttribute("data-scrollLock", $scrollLock ? "true" : "false")
        );
    });
</script>

<svelte:head>
    <title>BiddyGo</title>
</svelte:head>

<Wrapper>
    <Toaster></Toaster>
    <Header></Header>
    <slot></slot>
</Wrapper>
<Footer></Footer>