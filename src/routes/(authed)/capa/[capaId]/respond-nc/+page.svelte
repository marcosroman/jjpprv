<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';

	export let data;

	let capaId = data.capa._id;
</script>

<style>
	label, textarea {
		margin: 1vh;
	}
</style>

<form method="POST" class="container flex-col">
	<input type="hidden" name="id" value={capaId}>

	<label>Acciones inmediatas
		<textarea class="w-full min-h-30 h-40 my-2" name="proposed-immediate-solution" required placeholder="Para controlar o corregir la No-Conformidad"></textarea>
	</label>


	<label>Consecuencias de la No-Conformidad
		<textarea class="w-full min-h-30 h-40 my-2" name="consequences" required placeholder="En caso de que existan"></textarea>
	</label>

	<input type="submit" value="Guardar">
</form>

<hr>
<CapaView {capaId}/>
