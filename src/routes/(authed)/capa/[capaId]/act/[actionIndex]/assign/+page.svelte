<script>
	import { onMount } from 'svelte';

	import FormWithCapaView from '$lib/components/forms/FormWithCapaView.svelte';
	import Form from './Form.svelte';

	export let data;

	let capa = data.capa;
	let capaId = capa._id;
	let capaIssueSectorId = capa.issue.detectedInSectorId;
	let actionIndex = data.actionIndex;
	let action = capa.actions[actionIndex];

	let user = data.user;
	let users = null;
	let otherUsersInMySector = []; // this array will contain the list of users belonging to my sector (me included? as the first option)

	let formProps = { capaId, actionIndex, action, userId: user._id};
	// get user list
	onMount(async	() => {
		// get users list
    const res = await fetch('/api/user');
    users = await res.json();
		otherUsersInMySector = users.filter(
			(u) => u.roles.map((r) => r.sectorId).includes(capaIssueSectorId)
				&& u._id != user._id);

		formProps = {...formProps, otherUsersInMySector};
	});
</script>

<FormWithCapaView {Form} {formProps}/>
