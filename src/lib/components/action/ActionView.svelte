<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';
	import { onMount } from 'svelte';

	export let capaId;
	export let actionIndex;

	let action = null;

	onMount(async () => {
		try {
			const response = await fetch(`/api/capa/${capaId}/action/${actionIndex}`)
			action = await response.json();
		} catch(error) {
			console.error(error);
		}
	});
</script>

{#if action}
	<p>Accion: {action.proposal.proposedSolution}</p>
	<p>(propuesta el {action.proposal.proposalDate} por {action.proposal.proponentId})</p>
	<p>Fecha de compromiso: {action.proposal.commitmentDate}</p>

	{#if action.evidence && action.evidence.length>0}
		<p>Evidencia:</p>
		<EvidenceList {capaId} documentSection={`actions.${actionIndex}`}/>
	{:else}
		<p>No hay evidencia</p>
	{/if}

	{#if action.review}
		<h3>Seguimiento</h3>
		<p>por {action.review.reviewerId}</p>
		<p>La acccion {action.review.isAccomplished ? "fue" : "no fue"} lograda.</p>
		<p>Comentarios: {action.review.comments}</p>
	{:else}
		<p>(Seguimiento pendiente)
	{/if}

{:else}
	<p>Error. La accion no se encuentra.</p>
{/if}
