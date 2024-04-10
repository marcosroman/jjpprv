<script>
	import CapaMiniView from '$lib/components/capa/CapaMiniView.svelte';
	import PendingActionsPerCapa from '$lib/components/capa/PendingActionsPerCapa.svelte';

	export let capas, isTableViewSelected;
</script>

{#if capas.length === 0}
	<p class="text-center w-full">Sin acciones pendientes</p>
{:else}
	{#if !isTableViewSelected}
		<div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mx-6">
			{#each capas as capa}
				<div class="m-6 p-4">
					<div class="p-4 text-black rounded-md">
						<CapaMiniView capaId={capa._id}/>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex justify-center">
			<table class="w-10/12">
				{#each capas as capa}
					<tr>
						<td class="p-2">
							<CapaMiniView capaId={capa._id}/>
						</td>
					</tr>
				{/each}
			</table>
		</div>
	{/if}
{/if}

