<script>
	import EvaluateOrRescheduleCAForm from './EvaluateOrRescheduleCAForm.svelte';
	export let data;
	let capaId = data.capa._id;
	let correctiveActionsArray = data.capa.correctiveActions.response.actions;
	let isFormShown = false;
	let correctiveActionIndex = 0;
	let correctiveActionData = {};
	let isReschedule;

	function toggleFormVisibility() { isFormShown = !isFormShown; }
	function showRescheduleForm(index) { isReschedule = true;  showForm(index); }
	function showEvaluationForm(index) { isReschedule = false; showForm(index); }
	function showForm(index) {
		isFormShown = true;
		correctiveActionIndex = index;
		correctiveActionData = correctiveActionsArray[index];
	}
	function hasNoClosedEvaluation(correctiveAction) {
		if ('evaluation' in correctiveAction) {
			return !('isAccomplished' in correctiveAction.evaluation);
		} else return true;
	}
	function hasNoRescheduling(correctiveAction) {
		if ('evaluation' in correctiveAction) {
			return !('rescheduleDate' in correctiveAction.evaluation);
		} else return true;
	}
</script>

<p>{capaId}</p>

<ol>
	{#each correctiveActionsArray as correctiveAction, i}
		<li>
			{correctiveAction.solution} para el {correctiveAction.commitmentDate}
			{#if hasNoClosedEvaluation(correctiveAction)}
				{#if hasNoRescheduling(correctiveAction)}
					<button on:click={() => showRescheduleForm(i)}>Reprogramar</button>
				{:else}
					<p>(reprogramada para el {correctiveAction.evaluation.rescheduleDate})</p>
				{/if}
				<button on:click={() => showEvaluationForm(i)}>Evaluar</button>
			{:else}
				<p>({!correctiveAction.evaluation.isAccomplished ? "NO " : ""}LOGRADO)</p>
			{/if}
		</li>
	{/each}
</ol>

{#if isFormShown}
	<EvaluateOrRescheduleCAForm
		{capaId}
		{correctiveActionData}
		{correctiveActionIndex}
		{isReschedule}
		{toggleFormVisibility}/>
{/if}
