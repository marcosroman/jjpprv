<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';

	export let data;

	let capa = data.capa;
	let capaId = capa._id;
</script>

<form method='POST'>
	<input type="hidden" name="capa-id" value={capaId}>

	<p>Requiere accion correctiva?</p>
	<label>Si
		<input type="radio" name="is-ca-required" value="true" required>
	</label>
	
	<label>No
		<input type="radio" name="is-ca-required" value="false" required>
	</label>

	<input type="submit" value="Guardar">
</form>

<hr>
<CapaView {capaId}/>
