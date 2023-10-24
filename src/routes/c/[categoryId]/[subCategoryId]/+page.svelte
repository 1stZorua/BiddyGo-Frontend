<script lang=ts>
    import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { sendRequest } from "$lib/functions/request";

    const subCategoryId: string = $page.params.subCategoryId;

</script>

<div>{subCategoryId}</div>