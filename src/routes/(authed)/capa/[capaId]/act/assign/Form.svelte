<script>
	import userNameString from '$lib/utils/userName';

	export let capaId;
	export let capaActions;
	export let userId;
	export let otherUsersInMySector;
</script>

<form method="POST">
	<input type="hidden" name="id" value={capaId}>
	<input type="hidden" name="actions-count" value={capaActions.length}>

	<table>
		<tr>
			<th>Nro.</th>
			<th>Solucion</th>
			<th>Fecha limite de compromiso</th>
			<th>Responsable asignado</th>
			<th>Comentarios</th>
		</tr>
		{#each capaActions as action, index}
			<tr>
				<td>{index+1}</td>
				<td>{action.proposal.proposedSolution}</td>
				<td>{action.proposal.commitmentDate}</td>
				<td>
					<select name={`assignee-user-${index}`} required>
						<option value={userId} selected>Yo</option>
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
