<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';
	import { onMount } from 'svelte';
	import { dateString } from '$lib/utils/date';
	import userNameString from '$lib/utils/userName';
	import duringProcessString from '$lib/utils/during';

	export let capaId;

	let capa = null;
	let capaTypeDescription = null;
	let capaIssueDetectedDuring = null;

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
				capaIssueDetectedDuring = duringProcessString(capa.issue.detectedDuring);
			}
		}
	});
</script>

{#if capa}
	<div class="capa p-10">
		<div class="text-center py-5">
			<h1>Registro de {capaTypeDescription}</h1>
			<p class="text-xs">id {capa._id}</p>
			<p class="text-sm">version {capa.version}</p>
		</div>

		<div class="issue py-3">
			<table>
				<tr><th>Fecha</th><td>{dateString(capa.issue.creationDate)}</td></tr>
				<tr><th>Creador</th><td>{userNameString(capa.issue.issuer)}</td></tr>
				<tr><th>Sector de Origen</th><td>{capa.issue.detectedInSector.fullName}</td>
				<tr><th>Detectado en</th><td>{capaIssueDetectedDuring}</td>
			</table>

			<table class="my-3">
				<tr><th>Descripcion de la {capaTypeDescription}</th></tr>
				<tr><td><pre>{capa.issue.description}</pre></td></tr>
			</table>

			{#if capa.issue.evidence}
				<p>Evidencia:</p>
				<EvidenceList isEditMode={false} capaId={capa._id} documentSection="issue"/>
			{/if}
		</div>

		{#if capa.correctiveActionsRequirement && capa.correctiveActionsRequirement.requirementDate}
			<div class="py-3">
				<table><tr>
					<th>
					Corresponde una Accion Correctiva?
					</th>
				</tr><tr>
					<td class="text-center">
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
					</td>
				</tr></table>
			</div>
			<!--<p>(Decidido por {userNameString(capa.correctiveActionsRequirement.requirer)} el {dateString(capa.correctiveActionsRequirement.requirementDate)})</p>-->
		{/if}

		{#if capa.issue.isNonConformity}
			{#if Object.keys(capa.responseToNonConformity).length>0}
				<div class="py-3">
					<table>
						<tr><th>Fecha de respuesta a NC</th>
							<td>{dateString(capa.responseToNonConformity.responseDate)}</td></tr>
						<tr><th>Responde</th>
							<td>{userNameString(capa.responseToNonConformity.responder)}</td></tr>
						<tr><th>Consecuencias</th>
							<td>{capa.responseToNonConformity.possibleConsequences}</td></tr>
						<tr><th>Acciones inmediatas</th>
							<td>{capa.responseToNonConformity.immediateActions.proposedSolution}</td></tr>
						<tr><th>Evidencia:</th>
							{#if capa.responseToNonConformity.immediateActions.evidence}
								<td>
									<EvidenceList
										isEditMode={false}
										capaId={capa._id}
										documentSection="responseToNonConformity.immediateActions"/>
								</td>
							{:else}
								<td></td>
							{/if}</tr>
					</table>
				</div>
			{/if}
		{/if}

		<!--{#if capa.actions.length>0 && capa.actions[0].proposal.proposalDate}-->
		{#if capa.actions[0].proposal.proposalDate}
			{#if capa.issue.isNonConformity && capa.correctiveActionsRequirement.isRequired}
				<div class="py-3">
					<table>
						<tr>
							<th>
								Analisis de las causas
							</th>
							<td>{capa.responseToNonConformity.possibleRootCauses}</td>
						</tr>
					</table>
				</div>
			{/if}
			<div class="actions py-3">
				<div class="propuesta py-3">
					<h2>Acciones propuestas para {capa.issue.isNonConformity ? "eliminar las causas" : "adoptar la Oportunidad de Mejora"}</h2>
					<table>
						<tr>
							<th>Nro.</th>
							<th>Accion</th>
							<th>Fecha limite de compromiso</th>
							<th>Responsable</th>
							<th>Aceptado?</th>
						</tr>
						{#each capa.actions as action, index}	
							<tr>
								<td>{index+1}</td>
								<td>{action.proposal.proposedSolution}</td>
								<td>{dateString(action.proposal.commitmentDate)}</td>
								<td>{action.proposal?.assignment?.assigneeId ? userNameString(action.proposal.assignment.assignee) : ""}</td>
								<td>{action.proposal?.assignment?.acceptance?.isAccepted !== undefined ?
									(action.proposal?.assignment?.acceptance?.isAccepted ? "Si" : "No") : ""}</td>
							</tr>
						{/each}
					</table>
				</div>

				<div class="seguimiento py-3">
					<h3>Seguimiento de las acciones</h3>
					<table>
						<tr>
							<th>Nro.</th>
							<th>Evidencia</th>
							<th>Cumplida?</th>
							<th>Observaciones</th>
							<th>Fecha de reprogramacion</th>
							<th>Evaluador SGC</th>
						</tr>
						{#each capa.actions as action, index}	
							<tr>
								<td>{index+1}</td>
								{#if action.evidence}
									<td>
										<EvidenceList
											isEditMode={false}
											capaId={capa._id}
											documentSection="actions.{index}"/>
									</td>
								{:else}
									<td></td>
								{/if}
								<td>{action?.review?.isAccomplished !== undefined ?
									( action.review.isAccomplished ? "Si" : "No" ) : ""}</td>
								<td>{action?.review?.comments === "" ? "---" : action?.review?.comments}</td>
								{#if action?.review?.isAccomplished === undefined}
									<td>{action?.reschedule?.rescheduleDate ? dateString(action.reschedule.rescheduleDate) : ""}</td>
								{:else}
									<td>{action?.reschedule?.rescheduleDate ? dateString(action.reschedule.rescheduleDate) : "---"}</td>
								{/if}
								<td>{action?.review?.reviewerId ? userNameString(action.review.reviewer) : ""}</td>
							</tr>
						{/each}
					</table>
				</div>
			</div>
		{/if}

		<!--(Evaluacion asignada a {userNameString(capa.evaluation.assignment.evaluator)} por {userNameString(capa.evaluation.assignment.assigner)} el {dateString(capa.evaluation.assignment.assignationDate)})-->
		{#if capa?.evaluation && capa.evaluation.evaluationDate}
			<div class="py-3">
				<h2>Evaluacion</h2>
				{#if capa.evaluation?.evaluationDate}
					<table>
						<tr><th>Evaluador</th><td>{userNameString(capa.evaluation.assignment.evaluator)}</td></tr>
						<tr><th>Fecha</th><td>{dateString(capa.evaluation.evaluationDate)}</td></tr>
						<!--<tr><th>Considerada efectiva?</th><td>{capa.evaluation.isEffective ? "Si" : "No"}</td></tr>-->
						<tr><th>Comentarios</th><td>{capa.evaluation.comments}</td></tr>
					</table>
				{/if}
			</div>
		{/if}

		{#if capa?.closure && Object.keys(capa.closure).length>0}
			<div class="py-3">
				<h2>Cierre</h2>
				<table>
					<tr>
						<th>Es necesario actualizar los riesgos y oportunidades determinados durante la planificación?</th>
						<td>{capa.closure.isRisksUpdateRequired ? "Si" : "No"}</td>
					</tr>
					<tr>
						<th>Es necesario hacer cambios al sistema de gestión de la calidad?</th>
						<td>{capa.closure.isChangingQMSRequired ? "Si" : "No"}</td>
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
				{#if capa.closure.additionalCAPA}
					<p>NC/OM Adicional N.° (Coord. del SGC): {capa.closure.additionalCAPA}</p>
				{/if}
			</div>
		{/if}
	</div>
{/if}
