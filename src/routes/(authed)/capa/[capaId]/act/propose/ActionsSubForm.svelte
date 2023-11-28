<script>
	let countActions = 1;
	let actionsArray = [ {proposedSolution: "", commitmentDate: ""} ];

	export let today;

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

<input type="hidden" name="count-actions" value={countActions}>

<table>
	<tr>
		<th>Nro</th>
		<th>Solucion</th>
		<th>Fecha de compromiso</th>
	</tr>
	{#each actionsArray as action, actionIndex}
		<tr>
			<td>{actionIndex+1}</td>
			<td>
				<input
					type="text"
					name={"proposed-solution-"+actionIndex}
					bind:value={action.solution} 
					required>
			</td>
			<td>
				<input
					type="date"
					name={"commitment-date-"+actionIndex}
					bind:value={action.commitmentDate}
					min={today}
					required>
			</td>
			{#if countActions>1}
				<td>
					<button name={"delete-"+actionIndex} on:click|preventDefault={() => deleteAction(actionIndex)}>-</button>
				</td>
			{/if}
		</tr>
	{/each}
</table>
<button on:click|preventDefault={addNewAction}>+</button>

