<script>
	export let capaId, actionIndex, action;
</script>

<form method="POST">
	<input type="hidden" name="id" value={capaId}>
	<input type="hidden" name="action-index" value={actionIndex}>

	<table>
		<tr>
			<th>Solucion</th>
			<th>Fecha limite de compromiso</th>
			<th>Responsable asignado</th>
			<th>Comentarios</th>
		</tr>
		<tr>
			<td>{action.proposal.proposedSolution}</td>
			<td>{action.reschedule.rescheduledCommitmentDate}</td>
			<td>{action.reschedule.assignment.assigneeId}</td>
			<td>{action.reschedule.assignment.comments}</td>
	</table>

	<textarea name="comments" placeholder="Comentarios"></textarea>

	<input type="submit" value="Aceptar">
</form>
