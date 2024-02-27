<script>
	export let capaId;
</script>

<form method='POST' class="flex align-center flex-col">
	<input type="hidden" name="capa-id" value={capaId}>

	<p class="text-center">¿Requiere acciones correctivas?</p>
	<div class="flex flex-row justify-evenly my-4">
		<label>Sí
			<input type="radio" name="is-ca-required" value="true" required>
		</label>
		
		<label>No
			<input type="radio" name="is-ca-required" value="false" required>
		</label>
	</div>

	<div class="flex flex-row justify-center my-10">
		<input type="submit" value="Guardar">
	</div>
</form>
