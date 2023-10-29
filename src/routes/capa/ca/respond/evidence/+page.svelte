<script>
	export let data;
	let CAPAs = data.evidenceToCorrectiveActionsPendingCAPAs;
</script>

<p>(agregar evidencia a capas que ya tienen acciones correctivas pero todavia no evidencia)</p>

{#if CAPAs}
<ul>
	{#each CAPAs as CAPA}
		<li><a href="/capa/{CAPA._id}/ca/respond/evidence">{CAPA._id}: {CAPA.issue.description}</a></li>
	{/each}
</ul>
{:else}
	Nada
{/if}
