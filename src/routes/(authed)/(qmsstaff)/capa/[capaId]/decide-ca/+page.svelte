<script>
	import FormWithCapaView from '$lib/components/forms/FormWithCapaView.svelte';
	import Form from './Form.svelte';

	export let data;

	const capaId = data.capaId;
	const formProps = { capaId };
</script>

<FormWithCapaView {Form} {formProps}/>

