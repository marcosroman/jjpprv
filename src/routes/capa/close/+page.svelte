<script>
	export let data;

	let CAPAs = data.capas;
</script>

<p>(mostrar capas que ya tienen una evaluacion pero todavia no un cierre)</p>

{#each CAPAs as CAPA}
	<a href={`/capa/${CAPA._id}/close`}>{JSON.stringify(CAPA)}</a>
{/each}
