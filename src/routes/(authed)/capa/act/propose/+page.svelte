<script>
	export let data;

	let capas = data.capasRequiringActionsAndWithoutProposal ;
</script>

<p>(mostrar capas que deben tener acciones pero no tengan todavia (que son las no-conformidades que requieren accion correctiva o son las oportunidades de mejora))</p>

{#if capas}
	<ul>
		{#each capas as capa}
			<li>
				<a href={`/capa/${capa._id}/act/propose`}>
					{capa.issue.description} ({capa._id})</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>Nada</p>
{/if}
