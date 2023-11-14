<script>
	export let data;
	const capas = data.capasWithAllActionsReviewedPendingEvaluation;
</script>

(mostrar NC/OMs que ya tengan acciones resueltas (que cada una tenga review y dentro de review un valor para isAccomplished) pero que no tengan el campo 'evaluation')

{#if capas.length>0}
	<ul>
	{#each capas as capa}
		<li>
			<a href="/capa/{capa._id}/evaluate/assign">{capa.issue.description} ({capa._id})</a>
		</li>
	{/each}
	</ul>
{:else}
	<p>nada</p>
{/if}

