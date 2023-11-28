<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';
	export let data;

	let capaId = data.capa._id;
	let isNC = data.capa.issue.isNonConformity;
	let commentsByEvaluator;
</script>


<form method='POST'>
	<input type="hidden" value={capaId} name="capa-id">

	<label>Indique sus observaciones con respecto a la {isNC ? "No-Conformidad hallada" : "Accion de Mejora propuesta"} y lo evidenciado para {isNC ? "resolverla" : "efectuarla"}:
		<textarea name="comments" placeholder="Comentarios" required></textarea>
	</label>

	<p>En su opinion, las acciones tomadas fueron efectivas para {isNC ? "resolver la No-Conformidad" : "efectuar la accion de mejora"} ?</p>
	<label>Si
	<input type="radio" value="true" name="is-effective" required>
	</label>
	<label>No
	<input type="radio" value="false" name="is-effective" required>
	</label>


	<input type="submit" value="Guardar">
</form>

<hr>
<CapaView {capaId}/>
