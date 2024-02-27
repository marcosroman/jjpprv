<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';
	import { onMount } from 'svelte';
	import { dateString } from '$lib/utils/date';
	import userNameString from '$lib/utils/userName';
	import duringProcessString from '$lib/utils/during';
	import loadingAnimation from '$lib/assets/loading.gif'

	export let capaId;

	let capa = null;
	let capaTypeDescription = null;
	let capaIssueDetectedDuring = null;

	async function fetchCAPA() {
		try {
			const response = await fetch(`/api/capa/${capaId}/view`);
			capa = await response.json();
		} catch(error) {
			console.error(error);
		}

		if (capa) {
			capaTypeDescription = capa.issue.isNonConformity ?
				"No-Conformidad" :
				"Oportunidad de mejora";
			capaIssueDetectedDuring = duringProcessString(capa.issue.detectedDuring);
		}
	}

	onMount(async () => {
		fetchCAPA();
	});

	/*
	(this was used to make the goto work, but it caused problems)
	$: { 
		if(capaId) {
			capaId = capaId;
			fetchCAPA();
		}
	}
	*/
</script>

<style>
	tr, td {
		@apply p-2;
	}
</style>

{#if capa}
	<div class="capa p-10 h-full overflow-scroll">
		<div class="text-center py-5">
			<h1>Registro de {capaTypeDescription}</h1>
			<p class="text-xs">id {capa._id}</p>
			<p class="text-sm">version {capa.version}</p>
		</div>

		<div class="py-3 flex justify-center">
			<table class="w-full md:w-1/3 overflow-scroll">
				<tr><th>Fecha</th><td class="overflow-scroll">{dateString(capa.issue.creationDate)}</td></tr>
				<tr><th>Creador</th><td class="overflow-scroll">{userNameString(capa.issue.issuer)}</td></tr>
				<tr><th>Sector de Origen</th><td class="overflow-scroll">{capa.issue.detectedInSector.fullName}</td>
				<tr><th>Detectado en</th><td class="overflow-scroll">{capaIssueDetectedDuring}</td>
			</table>
		</div>

		<div class="py-3">
			<table class="my-3">
				<tr><th>Descripcion de la {capaTypeDescription}</th></tr>
				<tr><td><pre class="whitespace-pre-wrap">{capa.issue.description}</pre></td></tr>
			</table>

			{#if capa.issue.evidence}
				<div class="w-full overflow-auto ">
					<p>Evidencia</p>
					<EvidenceList isEditMode={false} capaId={capa._id} documentSection="issue"/>
				</div>
			{/if}
		</div>

		{#if capa.correctiveActionsRequirement && capa.correctiveActionsRequirement.requirementDate}
			<div class="py-3">
				<table>
					<tr><th>Corresponde una Accion Correctiva?</th></tr>
					<tr>
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
					</tr>
				</table>
			</div>
		{/if}

		{#if capa.issue.isNonConformity}
			{#if Object.keys(capa.responseToNonConformity).length > 1}
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
						<tr><th>Evidencia</th>
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

		{#if capa.actions[0].proposal.proposalDate}
			{#if capa.issue.isNonConformity && capa.correctiveActionsRequirement.isRequired}
				<div class="py-3">
					<table>
						<tr>
							<th>
								Analisis de las causas
							</th>
						</tr>
						<tr>
							<td><pre class="whitespace-pre-wrap">{capa.responseToNonConformity.possibleRootCauses}</pre></td>
						</tr>
					</table>
				</div>
			{/if}
			<div class="actions py-3">
				<h2>Acciones propuestas para {capa.issue.isNonConformity ? "eliminar las causas" : "adoptar la Oportunidad de Mejora"}</h2>
				<div class="propuesta py-3 overflow-x-scroll">
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

				<h3>Seguimiento de las acciones</h3>
				<div class="seguimiento py-3 overflow-x-scroll">
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
								<td>{action?.review?.comments === undefined ? "" : action?.review?.comments}</td>
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

		{#if capa?.evaluation && capa.evaluation.evaluationDate}
			<div class="py-3">
				<h2>Evaluacion</h2>
				{#if capa.evaluation?.evaluationDate}
					<table>
						<tr><th>Evaluador</th><td>{userNameString(capa.evaluation.assignment.evaluator)}</td></tr>
						<tr><th>Fecha</th><td>{dateString(capa.evaluation.evaluationDate)}</td></tr>
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
					{#if capa.closure.additionalCAPA}
						<tr>
							<th>{capaTypeDescription} Adicional</th>
							<td>
								<a on:click={() => {capaId = capa.closure.additionalCAPA}} href={`/capa/${capa.closure.additionalCAPA}/view`}>
									{capa.closure.additionalCAPA}
								</a>
							</td>
						</tr>
					{/if}
				</table>
			</div>
		{/if}
	</div>
{:else}
	<div class="h-1/6 h-max-1/6 flex flex-row justify-center">
		<img class="w-1/3" src={loadingAnimation} alt="Loading..."/>
	</div>
{/if}

