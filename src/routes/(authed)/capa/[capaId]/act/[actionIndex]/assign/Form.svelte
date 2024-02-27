<script>
	import userNameString from '$lib/utils/userName';
	import { dateString } from '$lib/utils/date';

	export let capaId, actionIndex, action, userId, otherUsersInMySector;
</script>

<form method="POST" class="container flex-col">
	<input type="hidden" name="id" value={capaId}>
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
			<th>Fecha limite de compromiso</th>
			<td>{dateString(action.proposal.commitmentDate)}</td>
		</tr>
		<tr>
			<th>Responsable asignado</th>
			<td>
				<select name="assignee-id" required>
					<option value={userId} selected>{userNameString(user)} (Yo)</option>
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

	<input class="my-6" type="submit" value="Guardar">
</form>


