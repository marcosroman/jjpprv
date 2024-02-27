<script>
	export let capaId, actionIndex;
</script>

<form method='POST' class="flex align-center flex-col">
	<input type="hidden" name="capa-id" value={capaId}>
	<input type="hidden" name="action-index" value={actionIndex}>

	<p class="text-center">¿La accion fue lograda?</p>
	<div class="flex flex-row justify-evenly my-4">
		<label>Si
			<input type="radio" value="true" name="is-accomplished">
		</label>
		<label>No
			<input type="radio" value="false" name="is-accomplished">
		</label>
	</div>

	<textarea class="w-3/5 place-self-center my-6 h-36" name="comments" placeholder="Comentarios"></textarea>

	<div class="flex flex-row justify-center my-10">
		<input type="submit" value="Guardar">
	</div>
</form>
