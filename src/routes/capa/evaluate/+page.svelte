<script>
	export let data;
	const capas = data.capasWithoutEvaluation;
</script>

<p>(listar NC/OMs con evaluador asignado pero sin evaluacion)</p>

{#each capas as capa}
	<a href={`/capa/${capa._id}/evaluate`}>
		{capa.issue.description} ({capa._id})
	</a>
{/each}

