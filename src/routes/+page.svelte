<script>
	import { onDestroy } from 'svelte';
	import { selectedDate } from '$lib/utils/stores';
	//import { pendingActionsForUser } from '$lib/utils/dashboard';

	export let data;
	let pendingActions = data.pendingActions;
	let user = data.user;

	async function ommitIssueEvidence(capaId) {
		try {
			await fetch(`/api/capa/${capaId}/issue/evidence/ommit`);
			location.reload();
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
		{#if pendingActions}
			{#if pendingActions.length>0}
				<ul class="list-disc">
					{#each pendingActions as action}
						<li><a href={action.link}>{action.description}</a> ({action.capa.issue.description.substr(0,30)+"..."})</li>
						{#if action.description === "agregar evidencia a nc/om"}
							<button on:click|preventDefault={() => ommitIssueEvidence(action.capaId)}>Omitir</button>
						{/if}
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
