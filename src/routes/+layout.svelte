<script>
	import '../app.pcss';
	import { onMount, onDestroy } from 'svelte';
	//import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	import userNameString from '$lib/utils/userName';
	import { selectedDate } from '$lib/utils/stores';

	export let data;

	let currentUser = data.user; // (from cookie. can be null)
	let selectedUserId = currentUser?._id;
	let users = null; // will contain users list

	let isOnline=false;
	
  function updateOnlineStatus() {
    isOnline = navigator.onLine;
  }

	onMount(async () => {
		// get users list
		const res = await fetch('/api/user')
		users = await res.json();

		isOnline = navigator.onLine;
		// Listen for online/offline events
		window.addEventListener('online', updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);
	});

	onDestroy(async () => {
		if (typeof window !== 'undefined') {
      window.removeEventListener('online', null);
      window.removeEventListener('offline', null);
    }
	});

	async function login() {
		// this sets the userId cookie to the selected userId
		if (selectedUserId != null) {
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

<nav>
	<div class="flex">
		<button class="text-xs"
			on:click={()=>{selectUserDateOn = !selectUserDateOn}}>
			{selectUserDateOn ? 'x': 'o'}
		</button>
		{#if selectUserDateOn}
			{#if users}
				<div>
					<label>Usuario:
						<select name="user" bind:value={selectedUserId} on:change={login}>
							<option value={null}></option>
							{#if users.length>0}
								{#each users as user}
									<option value={user._id}>
										{userNameString(user)} ({user._id})
									</option>
								{/each}
							{:else}
								<option disabled>No users were found</option>
							{/if}
						</select>
					</label>

					{#if currentUser}
						<button on:click={()=>{logout();}}>Cerrar sesion</button>
					{/if}
				</div>
			{/if}
			<div>
				<label>Fecha:
					<input type='datetime-local' name="date-time" bind:value={$selectedDate}>
					<button on:click={()=>{$selectedDate = (new Date()).toISOString().split('Z')[0]}}>Volver al presente</button>
				</label>
			</div>
		{:else}
			<div class="bg-gray-900 text-white w-full flex justify-center">
				<p class="text-xs">datetime = {$selectedDate}, userId = {selectedUserId}, connected={isOnline}</p>
			</div>
		{/if}
	</div>

	{#if currentUser}
		<div class={`${isOnline !== undefined ? ((isOnline===true) ? "bg-blue-600" : "bg-gray-600") : ""} text-gray-50 flex items-center`}>
			<a class="text-2xl" href="/">j<span><sub>a</sub><sup>2</sup></span>p<sub>o</sub><sup>2</sup>r<sub>a</sub>v<sub>e</sub></a>
			<a href="/capa/new">Nueva NC/OM</a>
			<a href="/capa/view">Ver NC/OMs</a>
			{#if currentUser.isQMSStaff}
				<a href="/capa/view/all">Ver Tabla del CSGC</a>
			{/if}
		</div>
	{/if}
</nav>

<slot></slot>

