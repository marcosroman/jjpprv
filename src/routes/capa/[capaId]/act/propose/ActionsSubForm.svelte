<script>
	let countActions = 1;
	let actionsArray = [ {proposedSolution: "", commitmentDate: ""} ];

	function addNewAction() {
		actionsArray = [
			...actionsArray,
			{proposedSolution: "", commitmentDate: ""}];
		countActions++;
	}
	function deleteAction(id) {
		actionsArray.splice(id,1);
		actionsArray=actionsArray; // for reactivity
		countActions--;
	}
</script>

<p>(DEBUG) action count = {countActions}</p>

<input type="hidden" name="count-actions" value={countActions}>

<table>
	<tr>
		<th>Solucion</th>
		<th>Fecha de compromiso</th>
	</tr>

	{#each actionsArray as action, i}
		<tr>
			<td>
				<input
					type="text"
					name={"proposed-solution-"+i}
					bind:value={action.solution} 
					placeholder={i}
					required>
			</td>
			<td>
				<input
					type="date"
					name={"commitment-date-"+i}
					bind:value={action.commitmentDate}
					required>
			</td>
			{#if countActions>1}
				<td>
					<button name={"delete-"+i} on:click|preventDefault={() => deleteAction(i)}>-</button>
				</td>
			{/if}
		</tr>
	{/each}
</table>
<button on:click|preventDefault={addNewAction}>+</button>

