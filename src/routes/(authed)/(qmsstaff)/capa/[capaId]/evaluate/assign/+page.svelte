<script>
	import { onMount } from 'svelte';

	import Form from './Form.svelte';
	import FormWithCapaView from '$lib/components/forms/FormWithCapaView.svelte';

	export let data;

	const capaId = data.capaId;
	const user = data.user;

	let formProps = { capaId };

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

				formProps = { capaId, allowedUsers };
			}
		}
	});
</script>

<!--<FormWithCapaView {Form} {formProps}/>-->

<svelte:component this={FormWithCapaView} {Form} {formProps}/>
