<script>
	import FormWithCapaView from '$lib/components/forms/FormWithCapaView.svelte';
	import Form from './Form.svelte';

	export let data;

	let capaId = data.capa._id;
	let formProps = { capaId };
</script>

<FormWithCapaView {Form} {formProps}/>
