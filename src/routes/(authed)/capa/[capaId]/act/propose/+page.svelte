<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';
	import ActionsSubForm from './ActionsSubForm.svelte';

	export let data;

	const capaId = data.capa._id;
	const capa = data.capa;
	const today = data.now.toISOString().split("T")[0];
	const user = data.user;
</script>


<form method="POST" class="container flex-col">
	<input type="hidden" name="id" value={capaId}>

	{#if capa.issue.isNonConformity}
		<div class="flex flex-col my-6">
		<label for="possible-root-causes">Analisis de las causas (raices) de la no-conformidad
		</label>
			<textarea class="h-40" name="possible-root-causes" required placeholder="Causas"></textarea>
		</div>
	{/if}
	
	<ActionsSubForm {today} {user} {capa}/>

	<input class="my-8" type="submit" value="Guardar">
</form>

<hr>
<CapaView {capaId}/>

