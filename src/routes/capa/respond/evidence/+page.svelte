<script>
	export let data;

	let CAPAs = data.evidenceToResponsePendingCAPAs;
</script>

<p>(agregar evidencia a capas con respuesta pero sin evidencia)</p>

{#if CAPAs}
	{#each CAPAs as CAPA}
		<a href={`/capa/${CAPA._id}/respond/evidence`}>{CAPA._id}</a>
	{/each}
{:else}
	<p>No responses with evidence pending or no capas</p>
{/if}
