<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';
	import ActionsSubForm from './ActionsSubForm.svelte';

	export let data;

	const capaId = data.capa._id;
	const capa = data.capa;
	const today = data.now.toISOString().split("T")[0];
	const user = data.user;
</script>

<form method="POST">
	<input type="hidden" name="id" value={capaId}>

	{#if capa.issue.isNonConformity}
		<label>Analisis de las causas (raices) de la no-conformidad:
			<textarea name="possible-root-causes" required placeholder="Causas"></textarea>
		</label>
	{/if}
	
	<ActionsSubForm {today} {user} {capa}/>
	<input type="submit" value="Guardar">
</form>

<hr>
<CapaView {capaId}/>

