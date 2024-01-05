<script>
	import { onMount } from 'svelte';
	import userNameString from '$lib/utils/userName';

	export let data;

	const capa = data.capa;
	let capaIssueSectorId = capa.issue.detectedInSectorId;
	const actionIndex = data.actionIndex;

	let users = data.user;
	let users = null;

	let newCommitmentDate;
	const minNewCommitmentDate = capa.actions[actionIndex].proposal.commitmentDate.split("T")[0];

	onMount(async () => {
		const res = await fetch('/api/user');
		users = await res.json();
		otherUsersInMySector = users.filter(
			(u) => u.roles.map((r) => r.sectorId).includes(capaIssueSectorId)
			&& u._id = user._id);
	});
</script>

<p>Accion:</p>
<p>{capa.actions[actionIndex].proposal.proposedSolution}</p>

<p>Usuario asignado:</p>
<p>{capa.actions[actionIndex].proposal.assigneeId}</p>

<p>Fecha de compromiso:</p>
<p>{capa.actions[actionIndex].proposal.commitmentDate}</p>

<form method="post">
	<label>Nueva fecha de compromiso (dsp de la primera)
		<input type="date" name={"new-commitment-date"} bind:value={newCommitmentDate} min={minNewCommitmentDate} required>
	</label>

	<label>Usuario Asignado
		<select name={'assignee-user'} required>
			<option value={user._id} selected>Yo</option>
			{#each otherUsersInMySector as otherUser}
				<option value={otherUser._id}>userNameString(otherUser)</option>
			{/each}
		</select>
	</label>

	<input type="submit" value="Guardar">
</form>
