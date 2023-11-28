<script>
	export let data;
	let capas = data.capas;
</script>

<p>(mostrar capas que ya tienen una evaluacion pero todavia no un cierre)</p>

{#each capas as capa}
	<a href={`/capa/${capa._id}/close`}>{capa.issue.description} ({capa._id})</a>
{/each}
