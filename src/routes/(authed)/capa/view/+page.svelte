<script>
	import CapasView from '$lib/components/capa/CapasView.svelte';
	import { isTableViewSelected } from '$lib/utils/stores.js';

	export let data;

	let { capas } = data;
</script>

<CapasView {capas} isTableViewSelected={$isTableViewSelected}/>
