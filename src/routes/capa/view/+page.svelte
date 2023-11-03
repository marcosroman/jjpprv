<script>
	export let data;

	let capas = data.capasAll;
</script>

{#if capas}
	<ul>
		{#each capas as capa}
			<li><a href={`/capa/${capa._id}/view`}>{capa._id} ({capa.issue.description})</a></li>
		{/each}
	</ul>
{:else}
	<p>Nada</p>
{/if}
