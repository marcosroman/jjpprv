<script>
	export let data;
	import { dateString } from '$lib/utils/date.js';
	const capas = data.capasArray;
</script>

<style>
	.table-container {
		width: 100%;
		overflow-x: scroll;
	}
</style>

{#if capas}
	<div class="table-container">
	<table>
		<thead>
			<tr>
				<th>id</th>
				<th>Tipo</th>
				<th>Fecha inicio</th>
				<th>Detectado durante</th>
				<th>Area de Origen</th>
				<th>Descripcion</th>
				<th>Fecha seguimiento</th>
				<th>Fecha evaluacion</th>
				<th>Estado (abierto/cerrado)</th>
				<th>Cierre eficaz?</th>
				<th>Actualizar riesgos/oportunidades?</th>
				<th>Introducir cambios al SGC?</th>
				<th>Observaciones</th>
			</tr>
		</thead>
		<tbody>
			{#each capas as capa}
				<tr>
					<td>{"..."+(capa._id).substr(-5)}</td>
					<td>{capa.issue.isNonConformity ? "NC" : "OM"}</td>
					<td>{dateString(capa.issue.creationDate)}</td>
					<td>{capa.issue.detectedDuring}</td>
					<td>{capa.issue.detectedInSectorId}</td>
					<td>{capa.issue.description}</td>
					<td>(fecha seguimiento...)</td>
					<td>{capa?.evaluation?.evaluationDate ?? ""}</td>
					<td>{capa?.closure?.closureDate ? "Cerrado" : "Abierto"}</td>
					<td>{capa?.closure?.closureDate ? (capa?.closure?.isClosedEffectively ? "Si" : "No") : ""}</td>
					<td>{capa?.closure?.closureDate ? (capa?.closure?.isRisksUpdateRequiredActualizar ? "Si" : "No") : ""}</td>
					<td>{capa?.closure?.closureDate ? (capa?.closure?.isChangingQMSRequired ? "Si" : "No") : ""}</td>
					<td>{capa?.closure?.comments ?? ""}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	</div>
{/if}

