<script>
	export let data;

	let capaId = data.capaId;
	let correctiveActionsArray = data.correctiveActionsArray;
</script>

<p>{JSON.stringify(correctiveActionsArray)}</p>

{#if correctiveActionsArray}
	<ul>
		{#each correctiveActionsArray as correctiveAction, index}
			<li>
				<a href={`/capa/${capaId}/ca/${index}/respond/evidence`}>
					{index}
			</a> 
		{/each}
	</ul>
{:else}
	Nada
{/if}
