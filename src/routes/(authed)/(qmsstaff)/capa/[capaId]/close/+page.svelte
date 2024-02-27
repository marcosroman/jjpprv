<script>
	import Form from './Form.svelte';
	import FormWithCapaView from '$lib/components/forms/FormWithCapaView.svelte';

	export let data;

	const capaId = data.capa._id;
	const formProps = { capaId };
</script>

<FormWithCapaView {Form} {formProps}/>
