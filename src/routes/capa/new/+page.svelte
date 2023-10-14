<script>
	export let data;
</script>

<form method="POST">
	<label>Registro de:
		<select name="is-non-conformity">
			<option value="true">NC (No-Conformidad)</option>
			<option value="false">OM (Oportunidad de Mejora)</option>
		</select>
	</label>

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

	<textarea name="issue-description" required></textarea>

	<input type="submit" value="Guardar">
</form>
