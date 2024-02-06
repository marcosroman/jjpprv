<script>
	import { dateString } from '$lib/utils/date';
	import duringProcessString from '$lib/utils/during';

	export let data;
	const capas = data.capasArray;
</script>

<style>
	.table-container {
		width: 100%;
		margin: 0 2em 2em 2em;
		overflow-x: scroll;
	}
	td {
		@apply py-1 px-2;
	}
	th {
		@apply p-2 bg-gray-400;
	}
</style>

<div class="container">
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
					<th>Fecha <wbr>seguimiento</th>
					<th>Fecha <wbr>evaluacion</th>
					<th>Estado</th>
					<th>Cierre <wbr>eficaz?</th>
					<th>Actualizar <wbr>riesgos/oportunidades?</th>
					<th>Introducir cambios al SGC?</th>
					<th>Observaciones</th>
				</tr>
			</thead>
			<tbody>
				{#each capas as capa}
					<tr>
						<td><a class="hover:font-bold" href={`/capa/${capa._id}/view`}>
							{"..."+(capa._id).substr(-5)}</a></td>
						<td>{capa.issue.isNonConformity ? "NC" : "OM"}</td>
						<td>{dateString(capa.issue.creationDate)}</td>
						<td>{duringProcessString(capa.issue.detectedDuring)}</td>
						<td>{capa.issue.detectedInSector.fullName}</td>
						<td>{capa.issue.description}</td>
						<td>
							{#if capa?.actions}
								<table class="border-none bg-none w-full">
									{#each capa.actions as action, index}
										<tr>
											<th class="w-1/6">{index+1}</th>
											<td>{action?.review?.reviewDate ?
												dateString(action.review.reviewDate) : ""}</td>
										</tr>
									{/each}
								</table>
							{/if}
						</td>
						<td>{capa?.evaluation?.evaluationDate ?
							dateString(capa.evaluation.evaluationDate) : ""}</td>
						<td>{capa?.closure?.closureDate ? "Cerrado" : "Abierto"}</td>
						<td>{capa?.closure?.closureDate ?
							(capa?.closure?.isClosedEffectively ? "Si" : "No") : ""}</td>
						<td>{capa?.closure?.closureDate ?
							(capa?.closure?.isRisksUpdateRequiredActualizar ?
							"Si" : "No") : ""}</td>
						<td>{capa?.closure?.closureDate ?
							(capa?.closure?.isChangingQMSRequired ?
								"Si" : "No") : ""}</td>
						<td>{capa?.closure?.comments ?? ""}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		</div>
	{/if}
</div>

