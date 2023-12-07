<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';
	import { onMount } from 'svelte';

	export let capaId;

	let capa = null;
	let capaTypeDescription = null;
	let capaIssueDetectedDuring = null;

	function userName(userObject) {
		return `${userObject.title} ${userObject.firstName} ${userObject.lastName}`;
	}

	onMount(async () => {
		try {
			const response = await fetch(`/api/capa/${capaId}/view`);
			capa = await response.json();
		} catch(error) {
			console.error(error);
		} finally {
			if (capa) {
				capaTypeDescription = capa.issue.isNonConformity ?
					"No-Conformidad" :
					"Oportunidad de mejora";
				switch(capa.issue.detectedDuring) {
					case 'pr': capaIssueDetectedDuring = 'Proceso'; break;
					case 'ia': capaIssueDetectedDuring = 'Auditoria Interna'; break;
					case 'ea': capaIssueDetectedDuring = 'Auditoria Externa'; break;
				}
			}
		}
	});
</script>

{#if capa}
	<!-- basic checklist: -->
	{#if capa.issue.isNonConformity}
		{#if capa.responseToNonConformity}
			<p>reponse to nonconformity OK </p>
		{:else}
			<p>reponse to nonconformity NOT OK </p>
		{/if}
		{#if capa.correctiveActionsRequirement}
			<p>corrective action requirement OK</p>
			{#if capa.correctiveActionsRequirement.isRequired}
				<p>CA required</p>
			{:else}
				<p>CA not required</p>
			{/if}
		{:else}	
			<p>corrective action requirement NOT OK</p>
		{/if}
	{/if}
	{#if capa.evaluation}
		<p>evaluation OK</p>
	{:else}
		<p>evaluation NOT OK</p>
	{/if}
	{#if capa.closure}
		<p>closure OK</p>
	{:else}
		<p>closure OK</p>
	{/if}

	<hr>
	<p>Id: {capa._id}</p>
	<table>
		<tr><th>Registro de</th><td>{capaTypeDescription}</td></tr>
		<tr><th>Version</th><td>{capa.version}</td></tr>
		<tr><th>Fecha</th><td>{capa.issue.creationDate}</td></tr>
		<tr><th>Creador</th><td>{userName(capa.issue.issuer)}</td></tr>
		<tr><th>Sector de Origen</th><td>{capa.issue.detectedInSector.fullName}</td>
		<tr><th>Detectado durante</th><td>{capaIssueDetectedDuring}</td>
		<tr><th>Descripcion de la {capaTypeDescription}</th><td>{capa.issue.description}</td></tr>
	</table>

	{#if capa.issue.evidence}
		Evidencia:
		<EvidenceList isEditMode={false} capaId={capa._id} documentSection="issue"/>
	{:else}
		<p>(No hay evidencia para la NC/OM)</p>
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
		<p>(Decidido por {userName(capa.correctiveActionsRequirement.requirer)} el {capa.correctiveActionsRequirement.requirementDate})</p>
	{/if}

	{#if capa.issue.isNonConformity}
		{#if capa.responseToNonConformity}
			<table>
				<tr><th>Fecha de respuesta a NC:</th><td>{capa.responseToNonConformity.responseDate}</td></tr>
				<tr><th>Responde:</th><td>{userName(capa.responseToNonConformity.responder)}</td></tr>
				<tr><th>Acciones inmediatas:</th><td>{capa.responseToNonConformity.immediateActions.proposedSolution}</td></tr>
				<tr><th>Consecuencias:</th><td>{capa.responseToNonConformity.possibleConsequences}</td></tr>
				<tr><th>Analisis de causas:</th><td>{capa.responseToNonConformity.possibleRootCauses}</td></tr>
			</table>

			{#if capa.responseToNonConformity.evidence}
				<EvidenceList isEditMode={false} capaId={capa._id} documentSection="responseToNonConformity"/>
			{:else}
				<h2>no hay evidencia de accion inmediata ante la no-conformidad</h2>
			{/if}
		{/if}
	{/if}

	{#if capa.actions}
		<h2>Acciones</h2>
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
						<td>{index+1}</td>
						<td>{action.proposal.proposedSolution}</td>
						<td>{action.proposal.commitmentDate}</td>
						<td>{action.proposal?.assignment?.assigneeId ? userName(action.proposal.assignment.assignee) : "(pendiente)"}</td>
						<td>{action.proposal?.assignment?.acceptance?.isAccepted ? "Si" : "No" ?? "(pendiente)"}</td>
					</tr>
				{/each}
			</table>

			<h3>Seguimiento de las acciones</h3>
			<table>
				<tr>
					<th>Nro.</th>
					<th>Cumplida?</th>
					<th>Observaciones</th>
					<th>Fecha de reprogramacion</th>
					<th>Evaluador SGC</th>
				</tr>
				{#each capa.actions as action, index}	
					<tr>
						<td>{index+1}</td>
						<td>{action?.review?.isAccomplished ? "Si" : "No"}</td>
						<td>{action?.review?.comments ?? "(Sin comentarios)"}</td>
						<td>{action?.reschedule?.rescheduleDate ?? "(Sin reprogramacion)"}</td>
						<td>{action?.review?.reviewerId ?? "(Pendiente)"}</td>
					</tr>
				{/each}
				</table>
		{/if}
	{/if}

	{#if capa?.evaluation}
		<h4>Evaluacion</h4>
		{#if capa.evaluation?.assignment}
			(Asignado {capa.evaluation.assignment.evaluatorId} by {capa.evaluation.assignment.assignerId} on {capa.evaluation.assignment.assignationDate})
		{/if}
		{#if capa.evaluation?.evaluationDate}
			<table>
				<tr><th>Fecha de evaluacion</th><td>{capa.evaluation.evaluationDate}</td></tr>
				<tr><th>Considerada efectiva?</th><td>{capa.evaluation.isEffective ? "Si" : "No"}</td></tr>
				<tr><th>Comentarios</th><td>{capa.evaluation.comments}</td></tr>
			</table>
		{/if}
	{/if}

	{#if capa?.closure}
		<h4>Cierre</h4>
		<table>
			<tr>
				<th>Es necesario actualizar los riesgos y oportunidades determinados durante la planificación?</th>
				<td>{capa.closure.isRisksUpdateRequired ? "Si" : "No"}</td>
			</tr>
			<tr>
				<th>Es necesario hacer cambios al sistema de gestión de la calidad?</th>
				<td>{capa.closure.isChangingQMSRequired}</td>
			</tr>
			<tr>
				<th>Comentarios</th>
				<td>{capa.closure.comments}</td>
			</tr>
			<tr>
				<th>Cierre eficaz de la acción</th>
				<td>{capa.closure.isClosedEffectively ? "Si" : "No"}</td>
			</tr>
		</table>
		NC/OM Adicional N.° (Coord. del SGC):
	{/if}
{/if}
