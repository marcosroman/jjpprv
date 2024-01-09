<script>
	import { onMount } from 'svelte';
	import userNameString from '$lib/utils/userName';
	import { dateString } from '$lib/utils/date';
	import CapaView from '$lib/components/capa/CapaView.svelte';

	export let data;

	let capa = data.capa;
	let capaId = capa._id;
	let capaIssueSectorId = capa.issue.detectedInSectorId;
	let actionIndex = data.actionIndex;
	let action = capa.actions[actionIndex];

	let user = data.user;
	let users = null;
	let otherUsersInMySector = []; // this array will contain the list of users belonging to my sector (me included? as the first option)

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

<form method="POST">
	<input type="hidden" name="id" value={capaId}>
	<input type="hidden" name="action-index" value={actionIndex}>
	<input type="hidden" name="proponent-id" value={action.proposal.proponentId}>

	<table>
		<tr>
			<th>Nro.</th>
			<td>{actionIndex+1}</td>
		</tr>
		<tr>
			<th>Solucion</th>
			<td>{action.proposal.proposedSolution}</td>
		</tr>
		<tr>
			<th>Fecha limite de compromiso</th>
			<td>{dateString(action.proposal.commitmentDate)}</td>
		</tr>
		<tr>
			<th>Responsable asignado</th>
			<td>
				<select name="assignee-id" required>
					<option value={user._id} selected>{userNameString(user)} (Yo)</option>
					{#if otherUsersInMySector}
						{#each otherUsersInMySector as otherUser}
							<option value={otherUser._id}>userNameString(otherUser)</option>
						{/each}
					{/if}
				</select>
			</td>
		</tr>
		<tr>
			<th>Comentarios</th>
			<td><input type="text" name="comments"></td>
		</tr>
	</table>

	<input type="submit" value="Guardar">
</form>

<hr>
<CapaView {capaId}/>

