<script>
	export let capaId;
</script>

<form method='POST' class="container flex-col w-1/2">
	<input type="hidden" value={capaId} name="capa-id">

	<p>Es necesario actualizar los riesgos y oportunidades determinadas durante la planificación?</p>
	<div class="flex flex-row justify-evenly w-1/2 my-2">
	<label>Si
	<input type="radio" name="is-risks-update-required" value="true" required>
	</label>
	<label>No
	<input type="radio" name="is-risks-update-required" value="false" required>
	</label>
	</div>

	<p class="mt-6">
		Es necesario hacer cambios al Sistema de Gestión de Calidad?
	</p>
	<div class="flex flex-row justify-evenly w-1/2 my-2">
	<label>Si
	<input type="radio" name="is-changing-qms-required" value="true" required>
	</label>
	<label>No
	<input type="radio" name="is-changing-qms-required" value="false" required>
	</label>
	</div>

	<label class="mt-6" for="comments">
		Comentarios
	</label>
	<textarea class="mt-2 h-32 w-1/2" name="comments" required></textarea>

	<p class="mt-10 font-bold">Accion cerrada eficazmente?</p>
	<div class="flex flex-row justify-evenly w-1/2 my-2">
	<label>Si
		<input type="radio" name="is-closed-effectively" value="true" required>
	</label>
	<label>No
		<input type="radio" name="is-closed-effectively" value="false" required>
	</label>
	</div>

	<input class="my-8" type="submit" value="Guardar">
</form>

