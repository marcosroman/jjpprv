<script>
	export let data;
</script>

{#if data.capas_without_evaluation.length > 0}
	<ul>
		{#each data.capas_without_evaluation as capa}
			<li>
				<a href="/capa/ca/evaluate/{capa._id}">{capa.issue?.description ?? "(sin descripcion)"}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No CAPAS pending evaluation for now</p>
{/if}

