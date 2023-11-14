<script>
	import { onMount } from 'svelte';
	export let capaId;

	let capa = null;
	let capaTypeDescription = null;

	onMount(async () => {
		try {
			const response = await fetch(`/api/capa/${capaId}`);
			capa = await response.json();
			capaTypeDescription = capa.issue.isNonConformity ? "No-Conformidad" : "Oportunidad de mejora";
		} catch(error) {
			console.error(error);
		}
	});
</script>

{#if capa}
	<pre>{JSON.stringify(capa)}</pre>

	<table>
		<tr><th>Registro de</th><td>{capaTypeDescription}</td></tr>
		<tr><th>Version</th><td>{capa.version}</td></tr>
		<tr><th>Id</th><td>{capa._id}</td></tr>
		<tr><th>Fecha</th><td>{capa.issue.creationDate}</td></tr>
		<tr><th>Creador</th><td>XXXUSUARIO</td></tr>
		<tr><th>Area de Origen</th><td>XXXSECTOR (falta linkear con la collection de sectores)</td>
		<tr><th>Detectado durante</th><td>XXXPR||IA||EA</td>
		<tr><th>Descripcion de la {capaTypeDescription}</th><td>{capa.issue.description}</td></tr>
	</table>

	{#if capa.issue.evidence}
		XXXEVIDENCIA DEL PROBLEMA
	{/if}

	{#if capa.issue.isNonConformity}
		{#if capa.response}
			<hr>
			<tr><th>Acciones inmediatas para Controlar o Corregir</th><td>{capa.response.immediateActions.proposedSolution}</td></tr>
			<tr><th>Consecuencias</th><td>{capa.response.possibleConsequences}</td></tr>
			<hr>
		{/if}
	{/if}

	{#if capa.correctiveActionsRequirement}
		<p>Corresponde una Accion Correctiva?</p>
		{#if capa.correctiveActionsRequirement.isRequired}
			<label>Si
				<input type="radio" name="corrective-action-required" value="yes" checked disabled>
			</label>
			<label>No
				<input type="radio" name="corrective-action-required" value="no" disabled>
			</label>
		{:else}
			<label>Si
				<input type="radio" name="corrective-action-required" value="yes" checked disabled>
			</label>
			<label>No
				<input type="radio" name="corrective-action-required" value="no" checked>
			</label>
		{/if}
		<p>(Decidido por XXXUSUARIO el {capa.correctiveActionsRequirement.requirementDate})</p>
	{/if}

	{#if capa.issue.isNonConformity}
		{#if capa.responseToNonConformity}
			<table>
				<tr><th>Fecha de respuesta a NC:</th><td>{capa.responseToNonConformity.responseDate}</td></tr>
				<tr><th>Responde:</th><td>{capa.responseToNonConformity.responderId}</td></tr>
				<tr><th>Acciones inmediatas:</th><td>{capa.responseToNonConformity.immediateActions.proposedSolution}</td></tr>
				<tr><th>Evidencia:</th><td>XXXEVIDENCIA (capa.responseToNonConformity.immediateActions.evidence)</td></tr>
				<tr><th>Consecuencias:</th><td>{capa.responseToNonConformity.possibleConsequences}</td></tr>
				<tr><th>Analisis de causas:</th><td>{capa.responseToNonConformity.possibleRootCauses}</td></tr>
			</table>
		{/if}
	{/if}

	{#if capa.actions}
		{#if capa.actions.length>0}
			<table>
					<tr>
						<th>Nro.</th>
						<th>Acciones a tomar para {capa.issue.isNonConformity ? "eliminar las causas" : "adoptar la Oportunidad de Mejora"}</th>
						<th>Fecha limite de compromiso</th>
						<th>Responsable</th>
						<th>Aceptado?</th>
					</tr>
				{#each capa.actions as action, index}	
					<tr>
						<td>{index}</td>
						<td>{action.proposal.proposedSolution}</td>
						<td>{action.proposal.commitmentDate}</td>
						<td>{action.proposal?.assignment?.responsibleId ?? "(pendiente)"}</td>
						<td>{action.proposal?.assignment?.acceptance?.isAccepted ? "Si" : "No" ?? "(pendiente)"}</td>
					</tr>
				{/each}
			</table>
		{/if}
	{/if}

	{#if capa.evaluation}
		<h4>Evaluacion</h4>
		{#if capa.evaluation}
			(Asignado {capa.evaluation.assignment.evaluatorId} by {capa.evaluation.assignment.assignerId} on {capa.evaluation.assignment.assignationDate})
		{/if}
	{/if}
{/if}
