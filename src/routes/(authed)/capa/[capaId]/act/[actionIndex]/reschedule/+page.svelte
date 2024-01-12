<script>
	import { onMount } from 'svelte';
	import userNameString from '$lib/utils/userName';

	export let data;

	const capa = data.capa;
	let capaIssueSectorId = capa.issue.detectedInSectorId;
	const actionIndex = data.actionIndex;

	let user = data.user;
	let users = null;
	let otherUsersInMySector = null;

	let newCommitmentDate;
	const minNewCommitmentDate = capa.actions[actionIndex].proposal.commitmentDate.split("T")[0];

	onMount(async () => {
		const res = await fetch('/api/user');
		users = await res.json();
		otherUsersInMySector = users.filter(
			(u) => u.roles.map(
				(r) => r.sectorId).includes(capaIssueSectorId)
					&& u._id !== user._id);
	});
</script>

<p>Accion:</p>
<p>{capa.actions[actionIndex].proposal.proposedSolution}</p>

<p>Usuario asignado:</p>
<p>{capa.actions[actionIndex].proposal.assignment.assigneeId}</p>

<p>Fecha de compromiso:</p>
<p>{capa.actions[actionIndex].proposal.commitmentDate}</p>

<form method="post">
	<input type="hidden" name="capa-id" value={capa._id}>
	<input type="hidden" name="action-index" value={actionIndex}>
	<input type="hidden" name="proponent-id" value={capa.actions[actionIndex].proposal.proponentId}>

	<label>Nueva fecha de compromiso (dsp de la primera)
		<input type="date" name={"new-commitment-date"} bind:value={newCommitmentDate} min={minNewCommitmentDate} required>
	</label>

	<label>Usuario Asignado
		<select name={'assignee-id'} required>
			<option value={user._id} selected>Yo</option>
			{#if otherUsersInMySector && otherUsersInMySector.length>0}
				{#each otherUsersInMySector as otherUser}
					<option value={otherUser._id}>{userNameString(otherUser)}</option>
				{/each}
			{/if}
		</select>
	</label>

	<textarea name="comments" placeholder="Comentarios"></textarea>

	<input type="submit" value="Guardar">
</form>
