<script>
	export let data;
	let pendingActions = data.pendingActions;

	async function ommitIssueEvidence(capaId) {
		try {
			await fetch(`/api/capa/${capaId}/issue/evidence/ommit`);
			location.reload();
		} catch(error) {
			console.error(error);
		}
	}
</script>

<h2>jjpprv</h2>

{#if pendingActions}
	{#if pendingActions.length>0}
		<ul>
			{#each pendingActions as action}
				<li><a href={action.link}>{action.description}</a> ({action.capa.issue.description.substr(0,20)+"..."})</li>
				{#if action.description === "agregar evidencia a nc/om"}
					<button on:click|preventDefault={() => ommitIssueEvidence(action.capaId)}>Omitir</button>
				{/if}
			{/each}
		</ul>
	{:else}
		<p>Sin acciones pendientes.</p>
	{/if}
{:else}
	<p>Identifiquese</p>
{/if}

