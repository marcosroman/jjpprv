<script>
	import { onMount } from 'svelte';
	import CapaView from '$lib/components/capa/CapaView.svelte';

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
			console.log('huh?')
			if(capa && users) {
				console.log('finally!')
				// define forbidden users 
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

<form method="POST">
	<input type="hidden" name="capa-id" value={capaId}>

	<label>Responsable asignado para la evaluacion:
		<select name="evaluator-id">
			{#each allowedUsers as u}
				<option value={u._id}>{u.firstName} {u.lastName}</option>
			{/each}
		</select>
	</label>

	<input type="submit" value="Guardar">
</form>

<hr>

<CapaView {capaId}/>
