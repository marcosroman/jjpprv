<script>
	import userNameString from '$lib/utils/userName';

	export let capaId;
	export let allowedUsers = [];
</script>

<form method="POST" class="container flex-col">
	<input type="hidden" name="capa-id" value={capaId}>

	<label for="evaluator-id">
		Responsable asignado para la evaluacion:
	</label>
	<select class="my-4" name="evaluator-id" required>
		<option selected disabled></option>
		{#each allowedUsers as u}
			<option value={u._id}>{userNameString(u)}</option>
		{/each}
	</select>

	<input class="my-8" type="submit" value="Guardar">
</form>
