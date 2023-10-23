<script>
	export let data;
</script>

{#if data.response_pending_capas.length > 0}
	<ul>
		{#each data.response_pending_capas as capa}
			<li>
				<a href="/capa/{capa._id}/respond">{capa.issue?.description ?? "(sin descripcion)"}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No CAPAS pending response for now</p>
{/if}
