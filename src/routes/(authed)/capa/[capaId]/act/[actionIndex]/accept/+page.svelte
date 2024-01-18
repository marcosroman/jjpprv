<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';
	import { dateString } from '$lib/utils/date';
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
			<td>{capa.actions[actionIndex].proposal.proposedSolution}</td>
		</tr>
		<tr>
			<th>Fecha limite de compromiso</th>
			<td>{dateString(capa.actions[actionIndex].proposal.commitmentDate)}</td>
		</tr>
		<tr>
			<th>Comentarios</th>
			<td>{capa.actions[actionIndex].proposal.assignment.comments}</td>
		</tr>
	</table>

	<textarea name="comments" placeholder="Comentarios"></textarea>

	<input type="submit" value="Aceptar accion asignada">
</form>

<hr>
<CapaView {capaId}/>
