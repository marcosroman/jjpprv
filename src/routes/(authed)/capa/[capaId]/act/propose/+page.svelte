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
		<div class="flex flex-col mb-10">
			<label for="possible-root-causes my-8">Analisis de las causas<wbr> (raices) de la No-Conformidad</label>
			<textarea class="h-36" name="possible-root-causes" required placeholder="Detalle "></textarea>
		</div>
	{/if}
	
	<ActionsSubForm {today} {user} {capa}/>

	<input class="my-8" type="submit" value="Guardar">
</form>

<hr>
<CapaView {capaId}/>

