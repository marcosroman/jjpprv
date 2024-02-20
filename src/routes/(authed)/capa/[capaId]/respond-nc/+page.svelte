<script>
	import Form from './Form.svelte';
	import FormWithCapaView from '$lib/components/forms/FormWithCapaView.svelte';

	export let data;

	let capaId = data.capa._id;
</script>

<FormWithCapaView {Form} {capaId}/>

