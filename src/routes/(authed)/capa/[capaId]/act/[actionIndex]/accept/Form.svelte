<script>
	import { dateString } from '$lib/utils/date';
	export let capaId, actionIndex, action;
</script>

<style>
	th, td {
		@apply p-2;
	}

	th {
		@apply bg-gray-400;
	}
</style>

<form method="POST" class="container flex-col">
	<input type="hidden" name="id" value={capaId}>
	<input type="hidden" name="action-index" value={actionIndex}>

	<table class="w-3/5 place-self-center">
		<tr>
			<th>Solucion</th>
			<td>{action.proposal.proposedSolution}</td>
		</tr>
		<tr>
			<th>Fecha limite<wbr> de compromiso</th>
			<td>{dateString(action.proposal.commitmentDate)}</td>
		</tr>
		<tr>
			<th>Comentarios</th>
			<td>{action.proposal.assignment.comments}</td>
		</tr>
	</table>

	<textarea class="w-3/5 my-6 h-30" name="comments" placeholder="Comentarios"></textarea>

	<input class="my-6" type="submit" value="Aceptar accion asignada">
</form>
