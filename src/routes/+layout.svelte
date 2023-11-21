<style>
	a {
		margin:1em;
		border: solid 1pt;
		text-decoration: none;
		color: red;
	}

	.done {
		color: darkgreen;
	}
</style>

<script>
	import { user } from '$lib/stores/user.js';
	import { onMount } from 'svelte';

	let users = null;
	let dateTime = (new Date()).toISOString().split('Z')[0];

	onMount(async () => {
		const res = await fetch('/api/user')
		users = await res.json();
		$user = users[0]; // later to be changed to name only
	});

	/*
	$user: {
		sessionStorage.setItem("userId", $user._id);
		console.log(sessionStorage.getItem("user"));
	}
	*/

</script>

<nav>
	{#if $user}
		<p>Usuario actual: {$user.name} {JSON.stringify($user)}</p>
	{/if}
	<br>
	<label>Usuario:
		<select type="select" name="user" bind:value={$user}>
			{#if users && users.length>0}
				{#each users as user}
					<option value={user}>{user.name}</option> <!--to be changed to user.name-->
				{/each}
			{/if}
		</select>
	</label>

	<label>Fecha-hora:
		<input type='datetime-local' name="date-time" value={dateTime}>
		<button on:click={()=>{dateTime = (new Date()).toISOString().split('Z')[0]}}>Ahora</button>
	</label>

	<hr>

	<a class="done" href="/">Inicio</a>
	<a class="done" href="/capa/new">Nueva NC/OM</a>
	<a class="done" href="/capa/new/evidence">Agregar evidencia a Nueva NC/OM [opcional?]</a>
	<a class="done" href="/capa/respond-nc">Responder a No-Conf [solo si NC/OM es NC]</a>
	<a class="done" href="/capa/respond-nc/evidence">Agregar Evidencia en Respuesta a No-Conf. (solo si capa es NC)</a>
	<a class="done" href="/capa/decide-ca">Decidir si requiere Acciones Correctivas (CSGC)</a>
	<a class="done" href="/capa/act/propose">Proponer Acciones ante NC/OM (para NC solo si requiere ACs)</a>
	<a class="done" href="/capa/act/assign">Asignar Responsable ante NC/OM (para NC solo si requiere ACs)</a>
	<a class="done" href="/capa/act/accept">Aceptar Responsabilidad ante NC/OM (para NC solo si requiere ACs)</a>
	<a class="done" href="/capa/act/evidence">Subir evidencia de acciones ante NC/OM (para NC solo si requiere ACs)</a>
	<a class="done" href="/capa/act/review">Hacer seguimiento de Acciones (CSGC)</a>
	<a class="done" href="/capa/evaluate/assign">Asignar Evaluador para NC/OM (CSGC)</a>
	<a class="done" href="/capa/evaluate">Evaluar NC/OM</a>
	<a class="done" href="/capa/close">Cerrar NC/OM (CSGC)</a>
	<a href="/capa/view">Ver NC/OM</a>
</nav>

<hr>

<slot></slot>

