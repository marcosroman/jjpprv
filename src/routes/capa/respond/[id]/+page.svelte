<script>
	export let data;

	let isCorrectiveActionRequired=false; //set to false later
	let countCorrectiveActions = Number(isCorrectiveActionRequired);
	let correctiveActionsArray = [{solution: "", commitmentDate: ""}];

	function addNewCorrectiveAction() {
		correctiveActionsArray = [
			...correctiveActionsArray,
			{solution: "", commitmentDate: ""}];
		countCorrectiveActions++;
	}
	function deleteCorrectiveAction(id) {
		correctiveActionsArray.splice(id,1);
		correctiveActionsArray=correctiveActionsArray;
		countCorrectiveActions--;
	}
	function updateCountCorrectiveActions() {
		if (isCorrectiveActionRequired && countCorrectiveActions==0) {
			countCorrectiveActions++;
			countCorrectiveActions=countCorrectiveActions;
		}
	}
</script>

{#if data.capa?.response}
	<p>There's a response already.</p>
{:else}
	<form method="POST">
		<input type="hidden" name="id" value={data.capa._id}>
		<input type="hidden" name="responder-user-id" value="1">

		<label>Acciones inmediatas:
		<textarea name="immediate-actions" required placeholder="Acciones Inmediatas"></textarea>
		</label>
		
		<p>evidencia...?</p>
		
		<label>Consecuencias:
		<textarea name="consequences" required placeholder="Consecuencias (blabla)"></textarea>
		</label>

		<label>Requiere Accion Correctiva?
			<input
				type="checkbox"
				name="is-ca-required"
				bind:checked={isCorrectiveActionRequired}
				on:change={updateCountCorrectiveActions}>
		</label>

		<p>(DEBUG) corrective action count = {countCorrectiveActions}</p>
		{#if isCorrectiveActionRequired}
			<label>Causas posibles:
				<textarea name="possible-root-causes" required></textarea>
			</label>

			<input type="hidden" name="count-corrective-actions" value={countCorrectiveActions}>
			<table>
				<tr>
					<th>Solucion</th>
					<th>Fecha de compromiso</th>
				</tr>

				{#each correctiveActionsArray as correctiveAction, i}
					<tr>
						<td>
							<input
								type="text"
								name={"solution-"+i}
								bind:value={correctiveAction.solution} 
								placeholder={i}
								required>
						</td>
						<td>
							<input
								type="date"
								name={"commitment-date-"+i}
								bind:value={correctiveAction.commitmentDate}
								required>
						</td>
						{#if countCorrectiveActions>1}
						<td>
							<button name={"delete-"+i} on:click|preventDefault={() => deleteCorrectiveAction(i)}>Eliminar</button>
						</td>
						{/if}
					</tr>
				{/each}
			</table>
			<button on:click|preventDefault={addNewCorrectiveAction}>Agregar otra</button>
		{/if}

		<input type="submit" value="Guardar">
	</form>
{/if}
