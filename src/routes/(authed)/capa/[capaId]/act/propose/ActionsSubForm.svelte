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

<style>
	td, th {
		@apply p-2;
	}
</style>

<input type="hidden" name="count-actions" value={countActions}>

<label for="actions-table" class="flex-1 text-left w-fit">Acciones propuestas</label>
<table name="actions-table" class="my-2">
	<tr>
		<th class="bg-gray-400">Nro</th>
		<th class="bg-gray-400">Accion</th>
		<th class="bg-gray-400">Fecha de compromiso</th>
		<th class="bg-gray-400">Responsable asignado</th>
		<th class="bg-gray-400">Comentarios</th>
		{#if countActions>1}
			<th class="bg-none opacity-0 border-none"></th>
		{/if}
	</tr>
	{#each actionsArray as action, actionIndex}
		<tr class="text-center">
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
				<td style="border-none flex flex-row justify-center align-center">
					<button class="text-sm bg-red-400 px-1 mx-1"
						name={"delete-"+actionIndex}
						on:click|preventDefault={() => deleteAction(actionIndex)}>
						❌
					</button>
				</td>
			{/if}
		</tr>
	{/each}
</table>

<button class="bg-gray-700" on:click|preventDefault={addNewAction}>Agregar accion</button>

