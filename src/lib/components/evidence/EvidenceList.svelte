<script>
	import { onMount } from 'svelte';
	import { getEvidenceDataFromCAPA } from './getEvidenceData.js';
	import EvidenceUpload from '$lib/components/evidence/EvidenceUpload.svelte';

	export let capaId; 
	export let section;
	export let isEditMode = false;
	// when isEditMode===true, we have and add evidence button and a delete evidence button for each of them...
	// when false, we only see a list

	export let correctiveActionIndex = null;

	let evidenceDataArray = [];
	onMount(async () => {
		evidenceDataArray = await getEvidenceDataFromCAPA(capaId, section, correctiveActionIndex);
	});


	let isEvidenceUploadActive=false;
	function addEvidence() {
		isEvidenceUploadActive=true;
	}
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
				{#if isEditMode}
					<button on:click|preventDefault={()=>alert(evidenceData._id)}>Eliminar</button>
				{/if}
			</tr>
		{/each}
	</table>
{:else}
	<p>No evidence found</p>
{/if}
{#if isEditMode}
	<button on:click|preventDefault={addEvidence}>Agregar evidencia</button>
{/if}


{#if isEvidenceUploadActive===true}
	<p>upload evidence...</p>
	<EvidenceUpload/>	
{/if}
