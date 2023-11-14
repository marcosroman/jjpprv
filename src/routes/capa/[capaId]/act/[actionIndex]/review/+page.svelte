<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';

	export let data;

	const capaId = data.capaId;
	const actionIndex = data.actionIndex;
</script>

<form method='POST'>
	<input type="hidden" name="capa-id" value={capaId}>
	<input type="hidden" name="action-index" value={actionIndex}>

	<input type="hidden" name="reviewer-id" value="reviewerid">

	<p>Se logro?</p>
	<label>Si
		<input type="radio" value="true" name="is-accomplished">
	</label>
	<label>No
		<input type="radio" value="false" name="is-accomplished">
	</label>

	<textarea name="comments" placeholder="Comentarios"></textarea>

	<input type="submit" value="Guardar">
</form>

