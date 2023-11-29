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
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	export let data;
	let currentUser = data.user; // (from cookie. can be null)

	let dateTime = (new Date()).toISOString().split('Z')[0];

	let selectedUserId = currentUser?._id;

	let users = null; // will contain users list
	onMount(async () => {
		// get users list
		const res = await fetch('/api/user')
		users = await res.json();
	});

	async function login() {
		// this sets the userId cookie to the selected userId
		if(selectedUserId!=null) {
			const response = await fetch('/api/user/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId: selectedUserId })
			});
			currentUser = await response.json();
		} else {
			logout();
		}
	}

	async function logout() {
		fetch('/api/user/logout');
		currentUser = null;
		selectedUserId = null;
		goto('/');
	}
</script>


<nav>
	{#if currentUser}
		<p>user = {currentUser.name} ({currentUser._id})</p>
	{/if}

	<br>

	{#if users}
		<label>Usuario:
			<select name="user" bind:value={selectedUserId} on:change={login}>
				<option value={null}></option>
				{#if users.length>0}
					{#each users as user}
						<option value={user._id}>{user.name} ({user._id})</option>
					{/each}
				{:else}
					<option disabled>No users were found</option>
				{/if}
			</select>
		</label>

		{#if currentUser}
			<button on:click={()=>{logout();}}>Logout</button>
		{/if}
	{/if}

	<label>Fecha-hora:
		<input type='datetime-local' name="date-time" value={dateTime}>
		<button on:click={()=>{dateTime = (new Date()).toISOString().split('Z')[0]}}>Ahora</button>
	</label>


	{#if currentUser}
		<p>Usuario actual: {currentUser.name} {JSON.stringify(currentUser)}</p>
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
		<hr>
	{/if}
</nav>


<slot></slot>

