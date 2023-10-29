<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';
	import CorrectiveActionsSubForm from './CorrectiveActionsSubForm.svelte';

	export let data;

	let capaId = data.capa._id;

	let isCorrectiveActionRequired = false; //set to false later
	let countCorrectiveActions = Number(isCorrectiveActionRequired);

	function updateCountCorrectiveActions() {
		if (isCorrectiveActionRequired && countCorrectiveActions==0) {
			countCorrectiveActions = 1;
		}
	}
</script>

{#if data.capa?.response}
	<p>There's a response already.</p>
{:else}
	<form method="POST">
		<input type="hidden" name="id" value={data.capa._id}>
		<input type="hidden" name="responder-user-id" value="1">

		<label>Acciones inmediatas:
			<textarea name="immediate-actions" required placeholder="Acciones Inmediatas"></textarea>
		</label>
	
		<label>Consecuencias:
			<textarea name="consequences" required placeholder="Consecuencias (blabla)"></textarea>
		</label>

		<label>Requiere Accion Correctiva?
			<input
				type="checkbox"
				name="is-ca-required"
				bind:checked={isCorrectiveActionRequired}
				on:change={updateCountCorrectiveActions}>
		</label>

		{#if isCorrectiveActionRequired}
			<CorrectiveActionsSubForm 
				{countCorrectiveActions}
				{isCorrectiveActionRequired}/>
		{/if}

		<input type="submit" value="Guardar">
	</form>
{/if}
