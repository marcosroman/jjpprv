<script>
	export let data;
	let capa = data.capa;
	let capaId = capa._id;
</script>

<p>{JSON.stringify(capa)}</p>

<form method='POST'>
	<input type="hidden" name="capa-id" value={capaId}>

	<p>Requiere accion correctiva?</p>
	<label>Si
		<input type="radio" name="is-ca-required" value="true" required>
	</label>
	
	<label>No
		<input type="radio" name="is-ca-required" value="false" required>
	</label>

			<!--
	<label>Requiere Accion Correctiva?
		<select name="is-ca-required" required> 
			<option selected disabled></option>
			<option value="true">Sí</option>
			<option value="false">No</option>
		</select>
	</label>
	-->

	<input type="submit" value="Guardar">
</form>
