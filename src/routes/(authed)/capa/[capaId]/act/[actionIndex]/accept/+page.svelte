<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';
	export let data;

	let capaId = data.capa._id;
	let capa = data.capa;
	let actionIndex = data.actionIndex;
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
			<td>{capa.actions[actionIndex].proposal.proposedSolution}</td>
			<td>{capa.actions[actionIndex].proposal.commitmentDate}</td>
			<td>{capa.actions[actionIndex].proposal.assignment.assigneeId}</td>
			<td>{capa.actions[actionIndex].proposal.assignment.comments}</td>
	</table>

	<textarea name="comments" placeholder="Comentarios"></textarea>

	<input type="submit" value="Aceptar">
</form>

<hr>
<CapaView {capaId}/>
