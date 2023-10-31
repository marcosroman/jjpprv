<script>
	export let data;

	let capaId = data.capa._id;
	let commentsByEvaluator;
</script>

<p>MOSTRAR ACA toda la capa hasta el momento!!!!</p>

<p>{capaId}</p>

<p>{JSON.stringify(data.capa)}</p>


<form method='POST'>
	<input type="hidden" value={capaId} name="capa-id">
	<textarea bind:value={commentsByEvaluator} name="comments-by-evaluator" placeholder="Comentarios"></textarea>
	<input type="submit" value="Guardar">
</form>
