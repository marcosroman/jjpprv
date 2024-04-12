<script>
	import '../app.pcss';

	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	import logo from '$lib/assets/logo.svg';

	import userNameString from '$lib/utils/userName';
	import { selectedDate, isTableViewSelected } from '$lib/utils/stores';

	export let data;

	let isConnectedToDB = data.isConnected;
	
	let currentUser = data.user; // (from cookie. can be null)
	let selectedUserId = currentUser?._id;
	let users = null; // will contain users list

	let isOnline = false;
	
  function updateOnlineStatus() {
    isOnline = navigator.onLine;
  }

	const tableViewIcon = "&#x25A4;";
	const gridViewIcon = "&#x25A6;";

	onMount(async () => {
		// get users list
		try {
			const res = await fetch('/api/user')
			users = await res.json();
		} catch(error) {
			console.error(error);
			//alert(JSON.stringify(error));
		}

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
			location.reload(); // ok for now
		} else logout();
	}

	async function logout() {
		fetch('/api/user/logout');
		currentUser = null;
		selectedUserId = null;
		goto('/');
		location.reload(); // ok for now
	}

	let selectUserDateOn = false;
</script>

<nav>
	<div class="flex">
		<button class="text-xs"
			on:click={() => {selectUserDateOn = !selectUserDateOn;}}>
			{selectUserDateOn ? 'x': 'o'}
		</button>
		{#if selectUserDateOn}
			{#if users}
				<div>
					<label>Usuario:
						<select name="user" bind:value={selectedUserId} on:change={login}>
							<option value={null} disabled></option>
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
			{:else}
				<p class="p-10 font-bold">Conectando a la base de datos...</p>
			{/if}
			<div>
				<label>Fecha:
					<input type='datetime-local' name="date-time" bind:value={$selectedDate}>
					<button on:click={()=>{$selectedDate = (new Date()).toISOString().split('Z')[0]}}>Volver al presente</button>
				</label>
			</div>
		{:else}
			<div class="bg-gray-900 text-white w-full flex justify-center">
				<p class="text-xs">datetime = {$selectedDate}, userId = {selectedUserId}, connected={isOnline}, isConnectedToDB = {isConnectedToDB}</p>
			</div>
		{/if}
	</div>

	{#if currentUser}
		<div class={`${isOnline !== undefined ? ((isOnline===true) ? "bg-blue-600" : "bg-gray-600") : ""} text-gray-50 flex justify-stretch overflow-auto`}>
			<div class="flex items-center">
				<a class="text-2xl max-[300px]:hidden" href="/">
					<div class="bg-gray-100 p-3 rounded-xl border-solid border-2 border-zinc-700">
						<img src={logo} alt='ja2po2rave'/>
					</div>
					<!--j<span><sub>a</sub><sup>2</sup></span>p<sub>o</sub><sup>2</sup>r<sub>a</sub>v<sub>e</sub>-->
				</a>
				<a href="/capa/new">Nueva NC/OM</a>
				<a href="/capa/view">Ver NC/OMs</a>
				{#if currentUser.isQMSStaff}
					<a href="/capa/view/all">Ver Tabla del CSGC</a>
				{/if}
			</div>
			<div class="hover:text-black my-auto ml-auto mr-[2em] border-gray-50 border"
				on:click={() => {$isTableViewSelected = !$isTableViewSelected}}
				aria-hidden={true}>
				<!--on:keydown={null} on:keyup={null} on:keypress={null}-->
				<p class="cursor-default hover:text-black text-2xl">{@html $isTableViewSelected ? gridViewIcon : tableViewIcon }</p>
			</div>
		</div>
	{/if}
</nav>

<slot></slot>

