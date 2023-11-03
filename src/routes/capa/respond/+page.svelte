<script>
	export let data;
	let capas = data.capasPendingResponse;
</script>

<p>(get all capas without response)</p>

{#if capas}
	<ul>
		{#each capas as capa}
			<li>
				<a href="/capa/{capa._id}/respond">{capa.issue?.description ?? "(sin descripcion)"}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No CAPAS pending response for now</p>
{/if}
