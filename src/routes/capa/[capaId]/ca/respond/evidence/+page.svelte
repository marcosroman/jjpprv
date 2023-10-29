<script>
	export let data;
	let capaId = data.capaId;
	let caArray = data.caArray;
</script>

<p>{JSON.stringify(caArray)}</p>

{#if caArray}
<ul>
	{#each caArray as caElement, index}
		<li><a href={`/capa/${capaId}/ca/${index}/respond/evidence`}>{index}</a> ({JSON.stringify(caElement)})</li><!--<a href="/capa/{CAPA._id}/ca/respond/evidence">{CAPA._id}: {CAPA.issue.description}</a></li>-->
	{/each}
</ul>
{:else}
	Nada
{/if}
