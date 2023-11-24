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
	//import { user } from '$lib/stores/user.js';
	import { onMount } from 'svelte';

	export let data;

	let userId = data.userId;

	let users = null;
	let selectedUser = null;
	//let userRole = null;
	let dateTime = (new Date()).toISOString().split('Z')[0];

	onMount(async () => {
		const res = await fetch('/api/user')
		users = await res.json();
		//$user = users[0];
	});

	$: {
		//if($user) {
    //data = await response.json();
		if(selectedUser) {
			console.log('selected user id is', selectedUser._id)
			console.log(JSON.stringify(selectedUser));
			const response = fetch('/api/user/login', {
				method: 'POST',
      	headers: {
        	'Content-Type': 'application/json',
      	},
				body: JSON.stringify({ userId: selectedUser._id })
			});
			userId = selectedUser._id;
		}
	}
</script>

<nav>
	{#if userId}
		<p>userId = {userId}</p>
	{/if}

	<br>

	{#if users}
		<label>Usuario:
			<select name="user" bind:value={selectedUser}>
				{#if users && users.length>0}
					{#each users as user}
						<option value={user}>{user.name}</option>
					{/each}
				{/if}
			</select>
		</label>
		<!--
		{#if $user}
			<label>Rol:
				<select name="role" bind:value={userRole}>
					{#if $user.roles.length>1}
						{#each $user.roles as role}
							<option value={role.sectorId}>{role.sectorId}</option>
						{/each}
					{:else}
						<option value={$user.roles[0].sectorId} selected disabled>{$user.roles[0].sectorId}</option>
					{/if}
				</select>
			</label>
		{/if}
		-->
	{/if}

	<label>Fecha-hora:
		<input type='datetime-local' name="date-time" value={dateTime}>
		<button on:click={()=>{dateTime = (new Date()).toISOString().split('Z')[0]}}>Ahora</button>
	</label>


	{#if selectedUser}
		<p>Usuario actual: {selectedUser.name} {JSON.stringify(selectedUser)}</p>
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

