<script>
	import PendingCapas from '$lib/components/capa/PendingCapas.svelte';
	import { selectedDate, isTableViewSelected } from '$lib/utils/stores';

	export let data;

	let { user, pendingActionsPerCapa } = data;

	let currentDate = $selectedDate; // Initialize with the current value

	$: {
		if ($selectedDate !== currentDate) {
			console.log('selected date changed to', $selectedDate);
			currentDate = $selectedDate;
			//updatePendingActions();
		}
		// TODO: check if user changes, update pendingActions if so
	}
</script>

{#if user && pendingActionsPerCapa}
	<PendingCapas
		{pendingActionsPerCapa}
		isTableViewSelected={$isTableViewSelected}
		selectedDate={$selectedDate}/>
{:else}
	<p class="text-center w-full">Identifiquese</p>
{/if}
