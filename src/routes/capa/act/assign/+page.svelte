<script>
	export let data;

	let capas = data.capasWithActionsPendingAssignment ;
</script>

<p>(mostrar capas que ya tienen acciones propuestas pero que todavia no tiene usuario asignado)</p>

{#if capas}
	<ul>
		{#each capas as capa}
			<li>
				<a href={`/capa/${capa._id}/act/assign`}>
					{capa.issue.description} ({capa._id})</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>Nada</p>
{/if}
