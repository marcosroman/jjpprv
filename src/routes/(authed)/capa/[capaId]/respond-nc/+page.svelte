<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';

	export let data;

	let capaId = data.capa._id;
</script>

{#if data.capa?.response}
	<p>Ya tiene respuesta.</p>
{:else}
	<CapaView {capaId}/>
	<hr>
	<form method="POST">
		<input type="hidden" name="id" value={capaId}>

		<label>Consecuencias:
			<textarea name="consequences" required placeholder="Consecuencias (blabla)"></textarea>
		</label>

		<label>Acciones inmediatas:
			<textarea name="proposed-immediate-solution" required placeholder="Acciones Inmediatas"></textarea>
		</label>

		<label>Analisis de las causas (raices) de la no-conformidad:
			<textarea name="possible-root-causes" required placeholder="Causas"></textarea>
		</label>
	
		<input type="submit" value="Guardar">
	</form>
{/if}
