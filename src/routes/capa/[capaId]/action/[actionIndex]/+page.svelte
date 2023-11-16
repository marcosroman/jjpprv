<script>
	import ActionView from '$lib/components/action/ActionView.svelte';
	export let data;

	const capaId = data.capaId;
	const actionIndex = data.actionIndex;
</script>

<p>capa {capaId}, actionIndex {actionIndex}</p>

<ActionView {capaId} {actionIndex}/>
