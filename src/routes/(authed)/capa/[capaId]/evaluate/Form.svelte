<script>
	export let capaId;// = formProps.capaId;
	export let isNC;// = formProps.isNC;
</script>

<form method='POST' class="container flex-col w-3/4 mx-8">
	<input type="hidden" value={capaId} name="capa-id">

	<label class="my-2 mx-6"for="comments">
		Indique sus observaciones con respecto a la
		{isNC ? "No-Conformidad hallada" : "Accion de Mejora propuesta"}<wbr>
		y lo evidenciado para {isNC ? "resolverla" : "efectuarla"}
	</label>
	<textarea class="my-2 w-1/2 h-36" name="comments" placeholder="Comentarios" required></textarea>

	<p class="my-4 mx-6">
		En su opinion, las acciones tomadas fueron efectivas para
		{isNC ? "resolver la No-Conformidad" : "efectuar la accion de mejora"}?
	</p>

	<div class="my-2 w-full flex flex-row justify-evenly">
		<label>Si
		<input type="radio" value="true" name="is-effective" required>
		</label>
		<label>No
		<input type="radio" value="false" name="is-effective" required>
		</label>
	</div>

	<input class="my-6" type="submit" value="Guardar">
</form>
