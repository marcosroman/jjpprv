<script>
	export let data;

	let capaId = data.capa._id;
	let isClosedEffectively = true;
</script>

<form method='POST'>
	<input type="hidden" value={capaId} name="capa-id">

	<label>
		Es necesario actualizar los riesgos y oportunidades determinadas durante la planificación?
		<label>Si
		<input type="radio" name="is-risks-update-required" value="true" required>
		</label>
		<label>No
		<input type="radio" name="is-risks-update-required" value="false" required>
		</label>
	</label>

	<label>
		Es necesario hacer cambios al sistema de gestión de la calidad?
		<label>Si
		<input type="radio" name="is-changing-qms-required" value="true" required>
		</label>
		<label>No
		<input type="radio" name="is-changing-qms-required" value="false" required>
		</label>
	</label>

	<label>
		Comentarios
		<textarea name="comments" required></textarea>
	</label>

	<p>Accion cerrada eficazmente?</p>
	<label>Si
		<input type="radio" name="is-closed-effectively" value="true" required>
	</label>
	<label>No
		<input type="radio" name="is-closed-effectively" value="false" required>
	</label>

	<input type="submit" value="Guardar">
</form>

