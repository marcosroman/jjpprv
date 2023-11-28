<script>
	export let data;
	let capas = data.capasWithNCPendingEvidence ;
</script>

<p>(obtener todas las NC con respuesta y sin evidencia)</p>

{#if capas}
	<ul>
		{#each capas as capa}
			<li>
				<a href="/capa/{capa._id}/respond-nc/evidence">{capa.issue?.description ?? "(sin descripcion)"}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No hay No-Conformidades sin respueta ahora</p>
{/if}
