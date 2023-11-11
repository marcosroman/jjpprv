<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';
	export let data;

	let capaId = data.capa._id;
	let capa = data.capa;
</script>

<CapaView {capaId}/>
<hr>
<form method="POST">
	<input type="hidden" name="id" value={capaId}>
	<input type="hidden" name="actions-count" value={capa.actions.length}>
	<table>
		<tr>
			<th></th>
			<th>Solucion</th>
			<th>Fecha limite de compromiso</th>
			<th>Responsable asignado</th>
			<th>Comentarios</th>
			<th>Aceptar/Rechazar</th>
			<th>Comentarios</th>
		</tr>
		{#each capa.actions as action, index}
			<tr>
				<td>{index+1}</td>
				<td>{action.proposal.proposedSolution}</td>
				<td>{action.proposal.commitmentDate}</td>
				<td>{action.proposal.assignment.responsibleId}</td>
				<td>{action.proposal.assignment.comments}</td>
				<td>
					<label>Aceptar
						<input type="radio" name={`accept-${index}`} value="true">
					</label>
					<label>Rechazar
						<input type="radio" name={`accept-${index}`} value="false">
					</label>
				</td>
				<td><input type="text" name={`comments-${index}`}></td>
			</tr>
		{/each}
	</table>
	<input type="submit" value="Guardar">
</form>
