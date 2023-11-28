<script>
	export let data;

	let capas = data.capasWithAssignedActionsPendingAcceptance;
</script>

<p>(mostrar capas que ya tienen acciones asignadas pero que todavia no fueron aceptadas o rechazadas)</p>

{#if capas}
	<ul>
		{#each capas as capa}
			<li>
				<a href={`/capa/${capa._id}/act/accept`}>
					{capa.issue.description} ({capa._id})</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>Nada</p>
{/if}
