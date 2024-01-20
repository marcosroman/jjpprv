<script>
	import duringProcessString from '$lib/utils/during';

	export let data;

	let isNC;
</script>

<style>
	label, select {
		margin: 1vh;
	}
</style>

<form method="post" class="container flex-col">
	<label>Registro de
		<select bind:value={isNC} name="is-non-conformity" required>
			<option selected disabled></option>
			<option value="true">No-Conformidad (NC)</option>
			<option value="false">Oportunidad de Mejora (OM)</option>
		</select>
	</label>

	{#if isNC}
		<label>Detectado durante
			<select name="detected-during" required>
				<option selected disabled></option>
				{#each ['pr', 'ia', 'ea'] as p}
					<option value={p}>{duringProcessString(p)}</option>
				{/each}
			</select>
		</label>

		<label>Detectado en
			<select name="detected-in-sector" required>
				<option selected disabled></option>
				{#each data.sectors as sector}
					<option value={sector._id}>{sector.fullName}</option>
				{/each}
			</select>
		</label>

		<label>Descripcion de la {isNC === "true" ? "No-Conformidad" : "Oportunidad de Mejora"}
			<textarea class="w-full min-h-30 h-40 my-2" name="issue-description" required></textarea>
		</label>
	{/if}

	<div class="flex flex-row justify-center py-10">
		<input type="submit" value="Guardar">
	</div>
</form>
