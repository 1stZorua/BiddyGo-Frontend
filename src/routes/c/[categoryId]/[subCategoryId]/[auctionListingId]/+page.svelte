<script lang=ts>
    import { ViewListing } from "../../../../../components/index.ts";
	import { setContext } from "svelte";
	import type { PageData } from "./$types";

    export let data: PageData

    $: setContext("bidData", data.form);
</script>

<ViewListing></ViewListing>