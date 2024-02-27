<script>
	import FormWithCapaView from '$lib/components/forms/FormWithCapaView.svelte';
	import Form from './Form.svelte';

	export let data;

	let capaId = data.capa._id;
	let capa = data.capa;
	let actionIndex = data.actionIndex;
	let action = capa.actions[actionIndex];

	let formProps = {capaId, actionIndex, action};
</script>

<FormWithCapaView {Form} {formProps}/>
