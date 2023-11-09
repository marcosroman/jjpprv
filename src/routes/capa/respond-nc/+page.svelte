<script>
	export let data;
	let capas = data.capasPendingResponseToNC;
</script>

<p>(obtener todas las NC sin respuesta (mostrar solo si 'isNonConfirmity'))</p>

{#if capas}
	<ul>
		{#each capas as capa}
			<li>
				<a href="/capa/{capa._id}/respond-nc">{capa.issue?.description ?? "(sin descripcion)"}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No hay No-Conformidades sin respueta ahora</p>
{/if}
