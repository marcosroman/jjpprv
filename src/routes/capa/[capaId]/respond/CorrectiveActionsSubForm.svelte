<script>
	export let isCorrectiveActionRequired;
	export let countCorrectiveActions = Number(isCorrectiveActionRequired);
	export let correctiveActionsArray = [{solution: "", commitmentDate: ""}];

	function addNewCorrectiveAction() {
		correctiveActionsArray = [
			...correctiveActionsArray,
			{solution: "", commitmentDate: ""}];
		countCorrectiveActions++;
	}
	function deleteCorrectiveAction(id) {
		correctiveActionsArray.splice(id,1);
		correctiveActionsArray=correctiveActionsArray;
		countCorrectiveActions--;
	}
</script>

	<p>(DEBUG) corrective action count = {countCorrectiveActions}</p>

<label>Causas posibles:
	<textarea name="possible-root-causes" required></textarea>
</label>

<input type="hidden" name="count-corrective-actions" value={countCorrectiveActions}>

<table>
	<tr>
		<th>Solucion</th>
		<th>Fecha de compromiso</th>
	</tr>

	{#each correctiveActionsArray as correctiveAction, i}
		<tr>
			<td>
				<input
					type="text"
					name={"solution-"+i}
					bind:value={correctiveAction.solution} 
					placeholder={i}
					required>
			</td>
			<td>
				<input
					type="date"
					name={"commitment-date-"+i}
					bind:value={correctiveAction.commitmentDate}
					required>
			</td>
			{#if countCorrectiveActions>1}
			<td>
				<button name={"delete-"+i} on:click|preventDefault={() => deleteCorrectiveAction(i)}>Eliminar</button>
			</td>
			{/if}
		</tr>
	{/each}
</table>
<button on:click|preventDefault={addNewCorrectiveAction}>Agregar otra</button>

