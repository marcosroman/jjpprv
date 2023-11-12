<script>
	export let data;
	let capas = data.capasWithoutCorrectiveActionsRequirement;
</script>
	
(get all capas without a correctiveActions field... then direct to capa/[capaId]/ca/decide)

{#if capas}
	<ul>
	{#each capas as capa}
		<li><a href={`/capa/${capa._id}/decide-ca`}>{capa.issue.description} ({capa._id})</a></li>
	{/each}
	</ul>
{:else}
	<p>No hay nada</p>
{/if}
