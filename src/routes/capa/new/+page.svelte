<script>
	export let data;

	let documentVersion=2;
	let isNonConformity;
	let detectedDuring;
	let detectionSector_id;
	let issueDescription;
	
</script>

<form method="POST">
	<label>Registro de:
		<select name="is-non-conformity" bind:value={isNonConformity}>
			<option value="true">NC (No-Conformidad)</option>
			<option value="false">OM (Oportunidad de Mejora)</option>
		</select>
	</label>

	<label>Detectado durante:
		<select name="detected-during" bind:value={detectedDuring}>
			<option value='proc'>Proceso</option>
			<option value='ia'>Auditoria Interna</option>
			<option value='ea'>Auditoria Externa</option>
		</select>
	</label>

	<label>Detectado en:
		<select name="detected-in-sector" bind:value={detectionSector_id}>
			{#each data.sectors as sector}
				<option value={sector._id}>{sector.fullName}</option>
			{/each}
		</select>
	</label>

	<textarea name="issue-description" bind:value={issueDescription} required></textarea>

	<input type="submit" value="Guardar">
</form>
