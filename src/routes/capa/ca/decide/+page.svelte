<script>
	export let data;
	let capas = data.capasWithoutCorrectiveActions;
</script>
	
(get all capas without a correctiveActions field... then direct to capa/[capaId]/ca/decide)

{#if capas}
	<ul>
	{#each capas as capa}
		<li><a href={`/capa/${capa._id}/ca/decide`}>{capa.issue.description} ({capa._id})</a></li>
	{/each}
	</ul>
{:else}
	<p>Nada</p>
{/if}
