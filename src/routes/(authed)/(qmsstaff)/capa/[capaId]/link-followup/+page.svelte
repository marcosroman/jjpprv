<script>
	export let data;

	const capaId = data.capaId;
	const capaOptionsToLink = data.capaOptionsToLink;

	function capaDescription(capa) {
		return `${capa._id}`;
	}
</script>

<form method="post" class="container flex-column">
	<input type="hidden" name="capa-id" value={capaId}>

	<label for="followup-capa-id">NC/OM de seguimiento</label>
	<select name="followup-capa-id" required>
		<option selected disabled></option>
		{#each capaOptionsToLink as capaOption}
			<option value={capaOption._id}>{capaDescription(capaOption)}</option>
		{/each}
	</select>

	<input type="submit" value="Guardar">
</form>
