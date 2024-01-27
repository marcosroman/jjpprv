<script>
	import { selectedDate } from '$lib/utils/stores';
	import CapaMiniView from '$lib/components/capa/CapaMiniView.svelte';

	export let data;

	let pendingActionsPerCapa = data.pendingActionsPerCapa;
	let user = data.user;

	async function ommitIssueEvidence(capaId) {
		try {
			await fetch(`/api/capa/${capaId}/issue/evidence/ommit`);
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
			pendingActionsPerCapa = body.pendingActions;
		} catch(error) {
			console.error(error);
			pendingActionsPerCapa = [];
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

<div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-6">
	{#if user}
		{#if pendingActionsPerCapa}
			{#if pendingActionsPerCapa.length>0}
				{#each pendingActionsPerCapa as capaObject}
					<div class="m-6 p-4">
						<div class="p-4 text-black rounded-md" style={`background-color: #${capaObject.capa._id.slice(-7,-1)};`}>
							<a href={`/capa/${capaObject.capa._id}/view`}>
								<CapaMiniView capaId={capaObject.capa._id}/>
							</a>
						</div>

						<div class="m-3">
							{#if capaObject.pendingActions.length>1}
								<span class="font-bold">Acciones pendientes:</span>
							{:else}
								<span class="font-bold">Accion pendiente:</span>
							{/if}
							<ol>
								{#each capaObject.pendingActions as action}
									<li class="ml-6">
										<a href={action.link} class="hover:text-zinc-400">
											<span>📌</span>
											{action.description}</a>
										<!-- adding evidence in issue section can be ommited -->
										{#if /\/capa\/[0-9a-z]+\/new\/evidence/.test(action.link)}
											<button on:click|preventDefault={
												() => ommitIssueEvidence(capaObject.capa._id)}>
												Omitir</button>
										{/if}
									</li>
								{/each}
							</ol>
						</div>
					</div>
				{/each}
			{:else}
				<p class="text-center">Sin acciones pendientes</p>
			{/if}
		{/if}
	{:else}
		<p>Identifiquese</p>
	{/if}
</div>
