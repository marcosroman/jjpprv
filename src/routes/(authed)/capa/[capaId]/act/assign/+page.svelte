<script>
	import { onMount } from 'svelte';
	import userNameString from '$lib/utils/userName';
	import CapaView from '$lib/components/capa/CapaView.svelte';

	export let data;

	let capa = data.capa;
	let capaId = capa._id;
	let capaIssueSectorId = capa.issue.detectedInSectorId;
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
	<input type="hidden" name="actions-count" value={capa.actions.length}>

	<table>
		<tr>
			<th>Nro.</th>
			<th>Solucion</th>
			<th>Fecha limite de compromiso</th>
			<th>Responsable asignado</th>
			<th>Comentarios</th>
		</tr>
		{#each capa.actions as action, index}
			<tr>
				<td>{index+1}</td>
				<td>{action.proposal.proposedSolution}</td>
				<td>{action.proposal.commitmentDate}</td>
				<td>
					<select name={`assignee-user-${index}`} required>
						<option value={user._id} selected>Yo</option>
						{#each otherUsersInMySector as otherUser}
							<option value={otherUser._id}>userNameString(otherUser)</option>
						{/each}
					</select>
				</td>
			</tr>
		{/each}
	</table>

	<input type="submit" value="Guardar">
</form>

<hr>
<CapaView {capaId}/>

