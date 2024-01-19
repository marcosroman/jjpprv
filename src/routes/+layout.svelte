<script>
	import '../app.pcss';
	import { onMount } from 'svelte';
	//import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	import userNameString from '$lib/utils/userName';
	import { selectedDate } from '$lib/utils/stores';

	export let data;

	console.log($selectedDate);

	let currentUser = data.user; // (from cookie. can be null)
	//let dateTime = (new Date()).toISOString().split('Z')[0];
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
			location.reload();
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

	let selectUserDateOn = false;
</script>

<nav >
	<div class="flex">
		<button class="text-xs" on:click={()=>{selectUserDateOn = !selectUserDateOn}}>
				{selectUserDateOn ? 'x': 'o'}
			</button>
		{#if selectUserDateOn}
			{#if users}
				<label>Usuario:
					<select name="user" bind:value={selectedUserId} on:change={login}>
						<option value={null}></option>
						{#if users.length>0}
							{#each users as user}
								<option value={user._id}>{userNameString(user)} ({user._id})</option>
							{/each}
						{:else}
							<option disabled>No users were found</option>
						{/if}
					</select>
				</label>

				{#if currentUser}
					<button on:click={()=>{logout();}}>Cerrar sesion</button>
				{/if}
			{/if}
			<br>
			<label>Fecha:
				<input type='datetime-local' name="date-time" bind:value={$selectedDate}>
				<button on:click={()=>{$selectedDate = (new Date()).toISOString().split('Z')[0]}}>Volver al presente</button>
			</label>
		{:else}
			<p class="text-xs">{$selectedDate} - Conectado como {selectedUserId}</p>
		{/if}
	</div>

	{#if currentUser}
		<hr>
		<a class="text-lg" href="/">j<span><sub>a</sub><sup>2</sup></span>p<sub>o</sub><sup>2</sup>r<sub>a</sub>v<sub>e</sub></a>
			<a href="/capa/new">Nueva NC/OM</a>
			<a href="/capa/view">Ver NC/OM</a>
			{#if currentUser.isQMSStaff}
				<a href="/capa/view/all">Ver todas las NC/OM (CSGC)</a>
			{/if}
		<hr>
	{/if}
</nav>

<slot></slot>

