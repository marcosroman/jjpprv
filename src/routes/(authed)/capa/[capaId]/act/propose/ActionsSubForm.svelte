<script>
	import { onMount } from 'svelte';

	export let today;
	export let user;
	export let capa;

		console.log(user);

	let countActions = 1;
	let actionsArray = [ {proposedSolution: "", commitmentDate: ""} ];

	let users = null;
	let otherUsersInMySector = null;

	let capaIssueSectorId = capa.issue.detectedInSectorId;

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

	// get user list
	onMount(async	() => {
		// get users list
    const res = await fetch('/api/user');
    users = await res.json();
		otherUsersInMySector = users.filter(
			(u) => u.roles.map((r) => r.sectorId).includes(capaIssueSectorId)
				&& u._id != user._id);
	});
</script>

<input type="hidden" name="count-actions" value={countActions}>

<table>
	<tr>
		<th>Nro</th>
		<th>Solucion</th>
		<th>Fecha de compromiso</th>
		<th>Responsable asignado</th>
		<th>Comentarios</th>
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
			<td>
				<select name={`assignee-user-${actionIndex}`} required>
        	<option value={user._id} selected>Yo</option>
					{#if otherUsersInMySector}
						{#each otherUsersInMySector as otherUser}
							<option value={otherUser._id}>userNameString(otherUser)</option>
						{/each}
					{/if}
        	<option value={null}>(Decidir luego)</option>
				</select>
			</td>
			<td>
				<input type="text" name={`comments-${actionIndex}`}>
			</td>
		</tr>
	{/each}
</table>

<button on:click|preventDefault={addNewAction}>+</button>

