<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';

	export let data;

	let capaId = data.capa._id;
</script>

{#if data.capa?.response}
	<p>Ya tiene respuesta.</p>
{:else}
	<form method="POST">
		<input type="hidden" name="id" value={capaId}>
		<input type="hidden" name="responder-id" value="(responder-id)">

		<label>Consecuencias:
			<textarea name="consequences" required placeholder="Consecuencias (blabla)"></textarea>
		</label>

		<label>Acciones inmediatas:
			<textarea name="immediate-actions" required placeholder="Acciones Inmediatas"></textarea>
		</label>
	
		<input type="submit" value="Guardar">
	</form>
{/if}
