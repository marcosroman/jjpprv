<script>
	import FormWithCapaView from '$lib/components/forms/FormWithCapaView.svelte';
	import Form from './Form.svelte';

	export let data;

	const capaId = data.capa._id;
	const capa = data.capa;
	const today = data.now.toISOString().split("T")[0];
	const user = data.user;

	const formProps = {
		capaId, capa, today, user
	};
</script>

<FormWithCapaView {Form} {formProps}/>
