<script>
	export let data;

	let capas = data.capasWithActionsAssignedAndAcceptedPendingEvidence;
</script>

<p>(mostrar capas que ya tienen acciones propuestas, asignadas y aceptadas pero que todavia no tienen evidencia)</p>

{#if capas.length>0}
	<ul>
		{#each capas as capa}
			<li>
				<a href={`/capa/${capa._id}/act/evidence`}>
					{capa.issue.description} ({capa._id})</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>Nada</p>
{/if}
