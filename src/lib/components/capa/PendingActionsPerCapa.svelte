<script>
	export let capaObject, updatePendingActions;

	async function ommitIssueEvidence(capaId) {
		try {
			await fetch(`/api/capa/${capaId}/issue/evidence/ommit`);
			updatePendingActions();
		} catch(error) {
			console.error(error);
		}
	}
</script>

{#if capaObject.pendingActions.length>1}
	<span class="font-bold">Acciones pendientes:</span>
{:else}
	<span class="font-bold">Accion pendiente:</span>
{/if}

<ul>
	{#each capaObject.pendingActions as action}
		<li>
			<a href={action.link} class="hover:text-zinc-400">
				<span>📌</span>
				{action.description}</a>
			<!-- adding evidence in issue section can be ommited
			(check with regex if link has the form
			'/capa/{(hex)id}/new/evidence') -->
			{#if /\/capa\/[0-9a-f]+\/new\/evidence/.test(action.link)}
				<button on:click|preventDefault={
					() => ommitIssueEvidence(capaObject.capa._id)}>
					Omitir</button>
			{/if}
		</li>
	{/each}
</ul>
