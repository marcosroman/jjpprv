<script>
	import Form from './Form.svelte';
	import FormWithCapaView from '$lib/components/forms/FormWithCapaView.svelte';

	export let data;

	let capaId = data.capaId;
	let isNC = data.isNC;

	let formProps = {capaId, isNC};
</script>

<FormWithCapaView {Form} {formProps}/>

