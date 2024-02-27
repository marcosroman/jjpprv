<script>
	import FormWithCapaView from '$lib/components/forms/FormWithCapaView.svelte';
	import Form from './Form.svelte';

	export let data;

	const capaId = data.capaId;
	const actionIndex = data.actionIndex;
	const action = data.actions;
	
	const formProps = {capaId, actionIndex, action};
</script>

<FormWithCapaView {Form} {formProps}/>
