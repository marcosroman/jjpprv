<script>
	import { user } from '$lib/stores/user.js';

	export let data;
	let isNC;
</script>

<form method="POST">
	{#if $user}
		<input type="hidden" name="issuer-id" value={$user._id}>
	{/if}

	<label>Registro de:
		<select bind:value={isNC} name="is-non-conformity">
			<option selected disabled></option>
			<option value="true">NC (No-Conformidad)</option>
			<option value="false">OM (Oportunidad de Mejora)</option>
		</select>
	</label>

	{#if isNC}
	<label>Detectado durante:
		<select name="detected-during">
			<option value='pr'>Proceso</option>
			<option value='ia'>Auditoria Interna</option>
			<option value='ea'>Auditoria Externa</option>
		</select>
	</label>

	<label>Detectado en:
		<select name="detected-in-sector">
			{#each data.sectors as sector}
				<option value={sector._id}>{sector.fullName}</option>
			{/each}
		</select>
	</label>

	<label>Descripcion de la {isNC === "true" ? "No-Conformidad" : "Oportunidad de Mejora"}:
	<textarea name="issue-description" required></textarea>
	</label>
	{/if}

	<input type="submit" value="Guardar">
</form>
