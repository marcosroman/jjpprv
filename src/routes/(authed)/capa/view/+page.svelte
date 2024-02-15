<script>
	import CapaMiniView from '$lib/components/capa/CapaMiniView.svelte';

	export let data;

	let capas = data.capasAll;
</script>

<div class="container">
	{#if capas.length>0 }
		<div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mx-6">
			{#each capas as capa}
				<div class="m-6 p-4">
					<div class="p-4 text-black rounded-md">
						<CapaMiniView capaId={capa._id}/>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p>No existen NC/OMs</p>
	{/if}
</div>
