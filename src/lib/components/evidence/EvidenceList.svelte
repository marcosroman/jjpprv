<script>
	import { onMount } from 'svelte';
	import { getEvidenceDataFromCAPA } from './getEvidenceData.js';

	export let capaId; 
	export let section;
	export let isEditMode = false;
	export let correctiveActionIndex = null;

	let evidenceDataArray = [];
	onMount(async () => {
		evidenceDataArray = await getEvidenceDataFromCAPA(capaId, section, correctiveActionIndex);
	});
</script>


{#if evidenceDataArray}
	<table>
		<tr>
			<th>Nombre</th>
			<th>Descripcion</th>
			<th>Tipo</th>
		</tr>
		{#each evidenceDataArray as evidenceData}
			<tr>
				<td>{evidenceData.fileName}</td>
				<td>{evidenceData.description}</td>
				<td>{evidenceData.fileType}</td>
			</tr>
		{/each}
	</table>
{:else}
	<p>No evidence found</p>
{/if}
