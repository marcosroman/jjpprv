<script>
	import { onMount } from 'svelte';

	import FormWithCapaView from '$lib/components/forms/FormWithCapaView.svelte';
	import Form from './Form.svelte';

	export let data;

	const capa = data.capa;
	const capaIssueSectorId = capa.issue.detectedInSectorId;
	const actionIndex = data.actionIndex;
	const action = capa.actions[actionIndex];

	const user = data.user;
	let users = null;
	let otherUsersInMySector = null;

	let formProps = {capaId: capa._id, actionIndex, action};

	onMount(async () => {
		const res = await fetch('/api/user');
		users = await res.json();
		otherUsersInMySector = users.filter(
			(u) => u.roles.map(
				(r) => r.sectorId).includes(capaIssueSectorId)
					&& u._id !== user._id);

		formProps = {...formProps, otherUsersInMySector};
	});
</script>

<FormWithCapaView {Form} {formProps}/>
