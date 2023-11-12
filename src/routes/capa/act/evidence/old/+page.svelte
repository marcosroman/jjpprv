<script>
	export let data;
	let capas = data.capasPendingEvidenceToCorrectiveActions;
</script>

<p>(agregar evidencia a capas que ya tienen acciones correctivas pero todavia no evidencia)</p>

{#if capas}
<ul>
	{#each capas as capa}
		<li><a href="/capa/{capa._id}/ca/respond/evidence">{capa._id}: {capa.issue.description}</a></li>
	{/each}
</ul>
{:else}
	Nada
{/if}
