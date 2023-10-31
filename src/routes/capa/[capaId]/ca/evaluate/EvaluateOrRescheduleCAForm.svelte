<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';

	export let capaId;
	export let correctiveActionData = {};
	export let correctiveActionIndex;
	export let isReschedule;
	export let toggleFormVisibility;
</script>

<hr>
<form method="POST">
	<input type="hidden" name="capa-id" value={capaId}>
	<input type="hidden" name="ca-index" value={correctiveActionIndex}>
	<input type="hidden" name="is-reschedule" value={isReschedule}>

	<p>{JSON.stringify(correctiveActionData)}</p>

	{#if isReschedule}
		<label>Nueva fecha a reprogramar:
			<input type="date" name="reschedule-date">
		</label>
	{:else}
		<p>EVIDENCIA:</p>
		<EvidenceList {capaId} documentSection={`correctiveActions.${correctiveActionIndex}`}/>

		<label>Comentarios:
			<textarea name="comments"></textarea>
		</label>

		<label>Logrado?
			<input type="checkbox" name="is-accomplished">
		</label>
		<!-- TODO: improve this, a tiny checkbox is not enough, needs some text or a dropdown -->
	{/if}

	<!--
	<button on:click|preventDefault={toggleFormVisibility}>OK</button>
	-->
	<input type="submit" value="test">
	<!--after submit, reaload data and toggle form visibility-->
	<!-- show confirmation (to add lates) when button is pressed...-->
</form>
