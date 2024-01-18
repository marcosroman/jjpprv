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
	/*

  const unsubscribe = selectedDate.subscribe(async (value) => {
		try {
			const response = await fetch(`/api/capa/pending?currentDate=${value}`);
			const body = await response.json();
			pendingActions = body.pendingActions;
		} catch(error) {
			console.error(error);
			pendingActions = [];
		}
		//pendingActions = pendingActionsForUser(user, new Date($selectedDate));

    // This function will be called whenever $x changes
		console.log('selected date changed to', $selectedDate);
    currentDate = value; // Update the current value
  });

  onDestroy(() => {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    unsubscribe();
  });
	*/

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

<h1>j<sub>a</sub><sup>2</sup>p<sub>o</sub><sup>2</sup>r<sub>a</sub>v<sub>e</sub></h1>
<p>{$selectedDate}</p>

{#if user}
	{#if pendingActions}
		{#if pendingActions.length>0}
			<ul>
				{#each pendingActions as action}
					<li><a href={action.link}>{action.description}</a> ({action.capa.issue.description.substr(0,20)+"..."})</li>
					{#if action.description === "agregar evidencia a nc/om"}
						<button on:click|preventDefault={() => ommitIssueEvidence(action.capaId)}>Omitir</button>
					{/if}
				{/each}
			</ul>
		{:else}
			<p>Sin acciones pendientes.</p>
		{/if}
	{/if}
{:else}
	<p>Identifiquese</p>
{/if}
