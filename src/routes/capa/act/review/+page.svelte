<script>
	export let data;

	let capas = data.capasWithActionsAssignedAndAcceptedWithEvidencePendingReview; 
</script>

<p>(mostrar capas que ya tienen acciones propuestas, asignadas y aceptadas, que ya tienen evidencia... pero que todavia no tiene seguimiento)</p>

{#if capas}
	<ul>
		{#each capas as capa}
			<li>
				<a href={`/capa/${capa._id}/act/review`}>
					{capa.issue.description} ({capa._id})</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>Nada</p>
{/if}
