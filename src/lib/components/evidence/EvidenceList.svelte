<script>
	import { onMount } from 'svelte';
	import { getEvidenceDataFromCAPA, updateAndGetEvidenceDataFromCAPA }
		from './getEvidenceData.js';
	import { deleteEvidenceDataFromCAPA, deleteEvidenceDataFromEvidence }
		from './deleteEvidenceData.js';
	import EvidenceUpload from '$lib/components/evidence/EvidenceUpload.svelte';

	export let isEditMode = false; // true shows 'add evidence'/'delete' buttons
	export let capaId; 
	export let section;
	//export let correctiveActionIndex = null;

	let evidenceDataArray = [];
	let newEvidenceId = null;
	let isEvidenceUploadActive = false;

	function showAddEvidence() { isEvidenceUploadActive = true; }
	function hideAddEvidence() { isEvidenceUploadActive = false; }
	
	// prop to EvidenceUpload component when isEditMmode === true :
	async function setNewEvidenceId(insertedEvidenceId) {
		newEvidenceId = insertedEvidenceId;
		evidenceDataArray = await updateAndGetEvidenceDataFromCAPA(
			//capaId, section, correctiveActionIndex, newEvidenceId);
			capaId, section, newEvidenceId);
		hideAddEvidence();
	}

	/*
	function deleteEvidence(evidenceId) {
		alert(evidenceId);
	}
	*/

	// when isEditMode === true
	async function deleteEvidence(evidenceId) {
		/*
		try {
			const res = await deleteEvidenceDataFromEvidence(evidenceId);
		} catch (error) {console.error(error);}
		*/

		const evidenceIds = evidenceDataArray.map(e => e._id); // (needed below)
		evidenceDataArray = await deleteEvidenceDataFromCAPA(
			capaId, section, evidenceId, evidenceIds);
	}

	onMount(async () => {
		evidenceDataArray = await getEvidenceDataFromCAPA(
			//capaId, section, correctiveActionIndex);
			capaId, section);
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
				{#if isEditMode}
					<button on:click|preventDefault={() =>
						deleteEvidence(evidenceData._id)}>Eliminar</button>
				{/if}
			</tr>
		{/each}
	</table>
{:else}
	<p>No evidence uploaded until now.</p>
{/if}

{#if isEditMode}
	<button on:click|preventDefault={showAddEvidence}>Agregar evidencia</button>
{/if}

{#if isEvidenceUploadActive === true}
	<EvidenceUpload setNewEvidenceId={setNewEvidenceId}/>	
{/if}
