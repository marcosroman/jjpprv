<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';

	export let data;

	const capaId = data.capaId;
</script>

<form method="POST">
	<input type="hidden" name="capa-id" value={capaId}>
	<input type="hidden" name="assigner-id" value="qms-person">
	<label>Responsable asignado para la evaluacion:
	<input type="text" name="evaluator-id" required>
	</label>

	<input type="submit" value="Guardar">
</form>

<hr>

<CapaView {capaId}/>
