<script>
	export let data;
	let capas = data.capasPendingEvidenceToResponse;
</script>

<p>(agregar evidencia a capas con respuesta pero sin evidencia)</p>

{#if capas}
	{#each capas as capa}
		<a href={`/capa/${capa._id}/respond/evidence`}>{capa._id} ({capa.issue.description})</a>
	{/each}
{:else}
	<p>No responses with evidence pending or no capas</p>
{/if}
