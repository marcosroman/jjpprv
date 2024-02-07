<script>
	import { onMount } from 'svelte';
	import CapaView from '$lib/components/capa/CapaView.svelte';
	import userNameString from '$lib/utils/userName';

	export let data;

	const capaId = data.capaId;
	const user = data.user;
	let capa = null;
	let users = null;
	let allowedUsers = [];

	onMount(async	() => {
		// get users list
		try {
			const resUsers = await fetch('/api/user');
			users = await resUsers.json();
			const resCapa = await fetch(`/api/capa/${capaId}/view`);
			capa = await resCapa.json();
		} finally {
			if(capa && users) {
				let forbiddenUsers = [
					capa?.issue?.issuerId,
					capa?.responseToNonConformity?.responderId,
					capa?.correctiveActionsRequirement?.requirerId
				];

				forbiddenUsers = capa.actions.map((action) => [
					action?.proposal?.proponentId,
					action?.proposal?.assignment?.assigneeId,
					action?.reschedule?.reschedulerId,
					action?.reschedule?.assignment?.assigneeId,
					action?.review?.reviewerId
				]).reduce((preVal, currVal) => [...preVal,...currVal], forbiddenUsers);

				allowedUsers = users.filter(
					(u) => u._id != user._id && !forbiddenUsers.includes(u)
				);
			}
		}
	});
</script>

<form method="POST" class="container flex-col">
	<input type="hidden" name="capa-id" value={capaId}>

	<label for="evaluator-id">Responsable asignado para la evaluacion:
	</label>
	<select class="my-4" name="evaluator-id" required>
		<option selected disabled></option>
		{#each allowedUsers as u}
			<option value={u._id}>{userNameString(u)}</option>
		{/each}
	</select>

	<input class="my-8" type="submit" value="Guardar">
</form>

<hr>

<CapaView {capaId}/>
