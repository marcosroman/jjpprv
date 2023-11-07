<script>
	import { onMount } from 'svelte';
	import EvidenceUpload from './EvidenceUpload.svelte';
	import EvidenceDetail from './EvidenceDetail.svelte';
	import { getEvidenceDataFromCAPA, updateAndGetEvidenceDataFromCAPA,
		       deleteEvidenceDataFromCAPA, deleteEvidenceDataFromEvidence }
		from './handleEvidenceData.js';

	export let isEditMode = false; // true shows 'add evidence'/'delete' buttons
	export let capaId; 
	export let documentSection;

	let evidenceDataArray = [];
	let newEvidenceId = null;
	let isEvidenceUploadActive = false;
	let isEvidenceViewActive = false;
	let evidenceIdToShow = null;

	function showAddEvidence() { isEvidenceUploadActive = true; }
	function hideAddEvidence() { isEvidenceUploadActive = false; }
	function showViewEvidence(evidenceId) { isEvidenceViewActive = true; evidenceIdToShow = evidenceId;}
	function hideViewEvidence(evidenceId) { isEvidenceViewActive = false; evidenceIdToShow = null;}
	
	// prop to EvidenceUpload component when isEditMmode === true :
	async function setNewEvidenceId(insertedEvidenceId) {
		newEvidenceId = insertedEvidenceId;
		try {
			evidenceDataArray = await updateAndGetEvidenceDataFromCAPA(
				capaId, documentSection, newEvidenceId);
			hideAddEvidence();
		} catch(error) {
			alert(error);
		}
	}

	// when isEditMode === true
	async function deleteEvidence(evidenceId) {
		try {
			await deleteEvidenceDataFromEvidence(evidenceId);
			const evidenceIds = evidenceDataArray.map(e => e._id);

			evidenceDataArray = await deleteEvidenceDataFromCAPA(
				capaId, documentSection, evidenceId, evidenceIds);
		} catch (error) { console.error(error); }
	}

	onMount(async () => {
		evidenceDataArray = await getEvidenceDataFromCAPA(capaId, documentSection);
	});
</script>

{#if evidenceDataArray && evidenceDataArray.length > 0}
	<table>
		<tr><th>Nombre</th><th>Descripcion</th><th>Tipo</th></tr>
		{#each evidenceDataArray as evidenceData}
			<tr>
				<td>{evidenceData.fileName}</td>
				<td>{evidenceData.description}</td>
				<td>{evidenceData.fileType}</td>
				<button on:click|preventDefault={() =>
					showViewEvidence(evidenceData._id)}>Ver</button>
				{#if isEditMode}
					<button on:click|preventDefault={() =>
						deleteEvidence(evidenceData._id)}>Eliminar</button>
				{/if}
			</tr>
		{/each}
	</table>
{:else}
	<p>(Todavia no se agregó evidencia)</p>
{/if}

{#if isEditMode}
	<button on:click|preventDefault={showAddEvidence}>Agregar evidencia</button>
{/if}

{#if isEvidenceViewActive}
	<button on:click|preventDefault={() => hideViewEvidence()}>Cerrar</button>
	<EvidenceDetail evidenceId={evidenceIdToShow}/>
{/if}

{#if isEvidenceUploadActive}
	<EvidenceUpload setNewEvidenceId={setNewEvidenceId}/>	
{/if}
