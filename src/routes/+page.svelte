<script>
	import { onMount } from 'svelte';
	export let data;
	let pendingActions = data.pendingActions;
	console.log(pendingActions);
</script>

<h2>jjpprv</h2>

{#if pendingActions}
	{#if pendingActions.length>0}
		<ul>
			{#each pendingActions as action}
				<li><a href={action.link}>{action.description}</a></li>
			{/each}
		</ul>
	{:else}
		<p>Sin acciones pendientes.</p>
	{/if}
{:else}
	<p>Identifiquese</p>
{/if}

