<script>

	import CapaView from '$lib/components/capa/CapaView.svelte';
	// show only if capa.correctiveActions.isRequired (=== true)
	//import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';
	import ActionsSubForm from './ActionsSubForm.svelte';

	export let data;

	let capaId = data.capa._id;
	let today = data.now.toISOString().split("T")[0];
</script>

<form method="POST">
	<input type="hidden" name="id" value={capaId}>
	<ActionsSubForm {today}/>
	<input type="submit" value="Guardar">
</form>

<hr>
<CapaView {capaId}/>

