<script>
	export let data;
	const capaId = data.capa._id;
	const capa = data.capa;
</script>

<p>count = {capa?.actions.length}</p>

{#if capa.actions.length>0}
	<ol>
	{#each capa.actions as action, index}
		<li>
			<a href={`/capa/${capaId}/act/${index}/evidence`}>{action.proposal.proposedSolution}</a>
		</li>
	{/each}
	</ol>
{/if}
