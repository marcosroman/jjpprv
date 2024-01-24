<script>
	import { onDestroy } from 'svelte';

	import { selectedDate } from '$lib/utils/stores';
	import CapaMiniView from '$lib/components/capa/CapaMiniView.svelte';

	//import { pendingActionsForUser } from '$lib/utils/dashboard';

	export let data;
	let pendingActionsPerCapa = data.pendingActionsPerCapa;
	let user = data.user;

	async function ommitIssueEvidence(capaId) {
		try {
			await fetch(`/api/capa/${capaId}/issue/evidence/ommit`);
			//location.reload();
			updatePendingActions();
		} catch(error) {
			console.error(error);
		}
	}

	let currentDate = $selectedDate; // Initialize with the current value

	async function updatePendingActions() {
		try {
			const response = await fetch(`/api/capa/pending?currentDate=${$selectedDate}`);
			const body = await response.json();
			pendingActions = body.pendingActions;
		} catch(error) {
			console.error(error);
			pendingActions = [];
		}
	}

	$: {
		if ($selectedDate !== currentDate) {
			console.log('selected date changed to', $selectedDate);
			currentDate = $selectedDate;
			updatePendingActions();
		}
	}
</script>

<div class="flex flex-col container">
	{#if user}
		{#if pendingActionsPerCapa}
			{#if pendingActionsPerCapa.length>0}
				<ul>
					{#each pendingActionsPerCapa as capaObject}
						<li>
							<div class="border-solid border-black bg-lime-300">
								<CapaMiniView capaId={capaObject.capa._id}/>
							</div>

							<ol class="list-disc">
								{#each capaObject.pendingActions as action}
									<li>
										<a href={action.link} class="hover:text-zinc-400"><span class="font-bold">Accion pendiente:</span> {action.description}</a>
										{#if action.description === "agregar evidencia a nc/om"}
											<button on:click|preventDefault={() => ommitIssueEvidence(action.capaId)}>Omitir</button>
										{/if}
									</li>
								{/each}
							</ol>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-center">Sin acciones pendientes.</p>
			{/if}
		{/if}
	{:else}
		<p>Identifiquese</p>
	{/if}
</div>
