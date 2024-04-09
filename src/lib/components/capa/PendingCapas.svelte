<script>
	import CapaMiniView from '$lib/components/capa/CapaMiniView.svelte';
	import PendingActionsPerCapa from '$lib/components/capa/PendingActionsPerCapa.svelte';

	export let pendingActionsPerCapa, isTableViewSelected, selectedDate;

	async function updatePendingActions() {
		try {
			console.log('trying fetch', `/api/capa/pending?currentDate=${selectedDate}`);
			const response = await fetch(`/api/capa/pending?currentDate=${selectedDate}`);
			const body = await response.json();
			pendingActionsPerCapa = body.pendingActions;
		} catch(error) {
			console.error(error);
			pendingActionsPerCapa = [];
		}
	}
</script>

{#if pendingActionsPerCapa.length === 0}
	<p class="text-center w-full">Sin acciones pendientes</p>
{:else}
	{#if !isTableViewSelected}
		<div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mx-6">
			{#each pendingActionsPerCapa as capaObject}
				<div class="m-6 p-4">
					<div class="p-4 text-black rounded-md">
						<CapaMiniView capaId={capaObject.capa._id}/>
					</div>
					<div class="m-3">
						<PendingActionsPerCapa {capaObject} {updatePendingActions}/>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex justify-center">
			<table class="w-10/12">
				<tr><th class="bg-black"></th><th class="bg-gray-400">Acciones pendientes</th></tr>
				{#each pendingActionsPerCapa as capaObject}
					<tr>
						<td class="p-2">
							<CapaMiniView capaId={capaObject.capa._id}/>
						</td>
						<td class="p-6 align-top">
							<PendingActionsPerCapa {capaObject} {updatePendingActions}/>
						</td>
					</tr>
				{/each}
			</table>
		</div>
	{/if}

{/if}
