<script>
	import { onMount } from 'svelte';
	import { addDays } from 'date-fns';

	import userNameString from '$lib/utils/userName';
	import { dateString } from '$lib/utils/date';

	export let data;

	const capa = data.capa;
	let capaIssueSectorId = capa.issue.detectedInSectorId;
	const actionIndex = data.actionIndex;
	const action = capa.actions[actionIndex];

	let user = data.user;
	let users = null;
	let otherUsersInMySector = null;

	//const commitmentDate = new Date(action.proposal.commitmentDate);
	const minNewCommitmentDate = (new Date()).toISOString().split("T")[0];
	let newCommitmentDate;

	console.log(minNewCommitmentDate);

	onMount(async () => {
		const res = await fetch('/api/user');
		users = await res.json();
		otherUsersInMySector = users.filter(
			(u) => u.roles.map(
				(r) => r.sectorId).includes(capaIssueSectorId)
					&& u._id !== user._id);
	});
</script>

<style>
	td, th {
		@apply p-2;
	}
	th {
		@apply bg-gray-400;
	}
</style>

<form method="post" class="container flex-col">
	<input type="hidden" name="capa-id" value={capa._id}>
	<input type="hidden" name="action-index" value={actionIndex}>
	<input type="hidden" name="proponent-id" value={action.proposal.proponentId}>

	<table>
		<tr>
			<th>Accion Nro.</th>
			<td>{Number(actionIndex)+1}</td>
		</tr>
		<tr>
			<th>Solucion</th>
			<td>{action.proposal.proposedSolution}</td>
		</tr>
		<tr>
			<th>Fecha de compromiso expirada</th>
			<td>{dateString(action.proposal.commitmentDate)}</td>
		</tr>
		<tr>
			<th>Nueva fecha de compromiso</th>
			<td><input type="date" name={"new-commitment-date"} bind:value={newCommitmentDate} min={minNewCommitmentDate} required></td>
		</tr>
		<tr>
			<th>Responsable asignado</th>
			<td>
				<select name="assignee-id" required>
					<option value={user._id} selected>{userNameString(user)} (Yo)</option>
					{#if otherUsersInMySector}
						{#each otherUsersInMySector as otherUser}
							<option value={otherUser._id}>{userNameString(otherUser)}</option>
						{/each}
					{/if}
				</select>
			</td>
		</tr>
		<tr>
			<th>Comentarios</th>
			<td><textarea name="comments"></textarea></td>
		</tr>
	</table>

	<!--
	<label>Usuario Asignado
		<select name="assignee-id" required>
			<option value={user._id} selected>Yo</option>
			{#if otherUsersInMySector && otherUsersInMySector.length>0}
				{#each otherUsersInMySector as otherUser}
					<option value={otherUser._id}>{userNameString(otherUser)}</option>
				{/each}
			{/if}
		</select>
	</label>
	-->

	<input class="my-6" type="submit" value="Guardar">
</form>
