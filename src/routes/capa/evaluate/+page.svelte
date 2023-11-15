<script>
	export let data;
	const capas = data.capasWithoutEvaluation;
</script>

<p>(listar NC/OMs con evaluador asignado pero sin evaluacion)</p>

{#if capas.length>0}
	<ul>
	{#each capas as capa}
		<li>
			<a href={`/capa/${capa._id}/evaluate`}>
				{capa.issue.description} ({capa._id})
			</a>
		</li>
	{/each}
	</ul>
{:else}
	<p>nada pendiente</p>
{/if}

