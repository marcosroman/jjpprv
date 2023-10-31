<script>
	export let data;

	let capaId = data.capa._id;
	let isClosedEffectively = true;
</script>

<p>{JSON.stringify(data.capa)}</p>

<form method='POST'>
	<input type="hidden" value={capaId} name="capa-id">

	<label>
		Es necesario actualizar los riesgos y oportunidades determinados durante la planificación?
		<input type="checkbox" name="is-risks-update-required">
	</label>

	<label>
		Es necesario hacer cambios al sistema de gestión de la calidad?
		<input type="checkbox" name="is-changing-qms-required">
	</label>

	<label>
		Comentarios
		<textarea name="comments" required></textarea>
	</label>

	<label>
		Accion cerrada eficazmente?
		<input bind:checked={isClosedEffectively} type="checkbox" name="is-closed-effectively">
	</label>

	<p>isClosedEffectively={isClosedEffectively}</p>
	{#if !isClosedEffectively}
		<label>
			NC/OM adicional
			<input name="additional-capa" required>
		</label>
	{/if}

	<input type="submit" value="Guardar">
</form>
