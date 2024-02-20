<script>
	export let capaId;
</script>

<style>
	label, textarea {
		margin: 1vh;
	}
</style>

<form method="POST" class="flex flex-col h-full w-full">
	<input type="hidden" name="id" value={capaId}>

	<label for="proposed-immediate-solution">
		Acciones inmediatas
	</label>
	<textarea class="min-h-30 h-40 my-2 w-2/3 self-center"
		name="proposed-immediate-solution"
		placeholder="Para controlar o corregir la No-Conformidad"
		required></textarea>

	<label for="consequences">
		Consecuencias de la No-Conformidad
	</label>
	<textarea class="min-h-30 h-40 my-2 w-2/3 self-center"
		name="consequences" placeholder="En caso de que existan"
		required></textarea>

	<input class="mt-4 w-min self-center" type="submit" value="Guardar">
</form>

