<script>
	export let data;

	let capas = data.capasAll;
</script>

<div class="container">
	{#if capas.length>0 }
		<ul class="list-disc">
			{#each capas as capa}
				<li>
					<a href={`/capa/${capa._id}/view`}>{capa._id} ({capa.issue.description})
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p>Nada</p>
	{/if}
</div>
