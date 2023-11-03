<script>
	export let data;

	let capas = data.capasRequiringCorrectiveActionsAndWithouthResponse;
</script>

<p>(mostrar capas que deben tener accion correctiva pero no tengan todavia)</p>

{#if capas}
	<ul>
		{#each capas as capa}
			<li>
				<a href={`/capa/${capa._id}/ca/respond`}>
					{capa.issue.description} ({capa._id})</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>Nada</p>
{/if}
