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
				<td><input type="text" name={`assignee-user-${index}`} required></td>
				<td><input type="text" name={`comments-${index}`}></td>
			</tr>
		{/each}
	</table>


	<input type="submit" value="Guardar">
</form>
