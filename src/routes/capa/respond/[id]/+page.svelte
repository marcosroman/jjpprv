<script>
	export let data;
	/*
  import { DateInput } from 'date-picker-svelte'
  let date = new Date()
	*/

	let isCorrectiveActionRequired;
</script>

{#if data.capa?.response}
	<p>There's a response already</p>
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
		<input type="checkbox" name="is-ca-required" bind:checked={isCorrectiveActionRequired}>
		</label>

		{#if isCorrectiveActionRequired}
			<label>Causas posibles:
				<textarea name="possible-root-causes" required></textarea>
			</label>

			<p>(pendiente aca agregar un array de estas... por ahora solo una, para probar lo basico)</p>
			<label>Solucion:
				<input type="text" name="solution">
			</label>

			<label>Fecha de compromiso:
				<input
					type="date"
					name="commitment-date"
					required>
			</label>

			<p>evidence component tambien aca...(porque eso voy a usar varias veces, tengo que disenar bien)</p>



		{/if}

		<!--
		(por el momento saco esto...)
		</label>
		<DateInput format="yyyy-MM-dd" bind:value={date} on:select={() => {alert(date.toISOString());}}/>
		-->

		<input type="submit" value="Guardar">
	</form>
{/if}
