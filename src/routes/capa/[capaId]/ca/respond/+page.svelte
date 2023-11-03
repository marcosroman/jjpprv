<script>
	// show only if capa.correctiveActions.isRequired (=== true)
	//import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';
	import CorrectiveActionsSubForm from './CorrectiveActionsSubForm.svelte';

	export let data;

	let capaId = data.capa._id;
</script>

<form method="POST">
	<input type="hidden" name="id" value={capaId}>
	<input type="hidden" name="responder-user-id" value="responder-user-id">

	<label>Causas posibles:
		<textarea name="possible-root-causes" required></textarea>
	</label>

	<CorrectiveActionsSubForm />

	<input type="submit" value="Guardar">
</form>
