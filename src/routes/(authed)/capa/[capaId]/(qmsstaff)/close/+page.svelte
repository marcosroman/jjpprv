<script>
	export let data;

	let capaId = data.capa._id;
	let isClosedEffectively = true;
</script>

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

	<p>Accion cerrada eficazmente?</p>
	<label>Si
		<input type="radio" name="is-closed-effectively" value="true" required>
	</label>
	<label>No
		<input type="radio" name="is-closed-effectively" value="false" required>
	</label>


	<!--
	<p>isClosedEffectively={isClosedEffectively}</p>
	{#if !isClosedEffectively}
		<label>
			NC/OM adicional
			<input name="additional-capa" required>
		</label>
	{/if}
	(later the user will be presented with the option for opening a new capa if the current one wasn't closed effectively)
	-->

	<input type="submit" value="Guardar">
</form>



<p>{JSON.stringify(data.capa)}</p>

