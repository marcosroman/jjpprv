<script>
	import CapaMiniView from '$lib/components/capa/CapaMiniView.svelte';

	export let data;

	let capas = data.capasAll;
</script>

<div class="container">
	{#if capas.length>0 }
		<div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-6">
			{#each capas as capa}
				<div class="m-6 p-4">
					<div class="p-4 text-black rounded-md" style={`background-color: #${capa._id.slice(-7,-1)};`}>
						<a href={`/capa/${capa._id}/view`}>
							<CapaMiniView capaId={capa._id}/>
						</a>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p>Nada</p>
	{/if}
</div>
