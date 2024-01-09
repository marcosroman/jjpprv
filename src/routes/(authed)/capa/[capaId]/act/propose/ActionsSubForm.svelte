<script>
	import { onMount } from 'svelte';
	import userNameString from '$lib/utils/userName';

	export let today;
	export let user;
	export let capa;

	let users = null;
	let otherUsersInMySector = null;

	let capaIssueSectorId = capa.issue.detectedInSectorId;

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
				<textarea name={"proposed-solution-"+actionIndex}
					bind:value={action.solution} 
					required></textarea>
			</td>
			<td>
				<input
					type="date"
					name={"commitment-date-"+actionIndex}
					bind:value={action.commitmentDate}
					min={today}
					required>
			</td>
			<td>
				<select name={`assignee-user-${actionIndex}`} required>
					{#if otherUsersInMySector && otherUsersInMySector.length>0}
						<option selected disabled></option>
						<option value={user._id}>Yo</option>
						{#each otherUsersInMySector as otherUser}
							<option value={otherUser._id}>{userNameString(otherUser)}</option>
						{/each}
						<option value={null}>(Decidir luego)</option>
					{:else}
						<option value={user._id} selected>Yo</option>
					{/if}
				</select>
			</td>
			<td>
				<input type="text" name={`comments-${actionIndex}`}>
			</td>
			{#if countActions>1}
				<td>
					<button name={"delete-"+actionIndex} on:click|preventDefault={() => deleteAction(actionIndex)}>Eliminar</button>
				</td>
			{/if}
		</tr>
	{/each}
</table>

<button on:click|preventDefault={addNewAction}>Agregar accion</button>

