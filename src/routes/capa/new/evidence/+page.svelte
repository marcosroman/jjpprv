<script>
	export let data;

	let capas = data.evidenceToIssuePendingCapas;
</script>

<p>(agregar evidencia a capas con issue sin evidencia)</p>

{#if capas}
	<ul>
	{#each capas as capa}
		<li><a href={`/capa/${capa._id}/new/evidence`}>{capa.issue.description} ({capa._id})</a></li>
	{/each}
	</ul>
{:else}
	<p>No issues with evidence pending or no capas</p>
{/if}
