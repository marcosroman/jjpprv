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
	export let allowEvidenceUpload = false;

	let evidenceDataArray = [];
	let newEvidenceId = null;
	let isEvidenceUploadActive = allowEvidenceUpload;
	let isEvidenceViewActive = false;
	let evidenceIdToShow = null;

	function showAddEvidence() {
		isEvidenceUploadActive = true;
	}
	function hideAddEvidence() {
		isEvidenceUploadActive = false;
	}
	function showViewEvidence(evidenceId) {
		isEvidenceViewActive = true;
		evidenceIdToShow = evidenceId;
	}
	function hideViewEvidence(evidenceId) {
		isEvidenceViewActive = false;
		evidenceIdToShow = null;
	}
	
	// function sent as prop to EvidenceUpload component when isEditMmode === true :
	async function setNewEvidenceId(insertedEvidenceId) {
		newEvidenceId = insertedEvidenceId;
		try {
			evidenceDataArray = await updateAndGetEvidenceDataFromCAPA(
				capaId, documentSection, newEvidenceId);
			//hideAddEvidence();
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
		try {
			evidenceDataArray = await getEvidenceDataFromCAPA(capaId, documentSection);
		} catch(error) { console.error(error); }
	});

	function fileTypeString(fileType) {
		const fileTypeCategory = fileType.split('/')[0];

		if (fileTypeCategory === 'video') {
			return 'Video';
		} else if (fileTypeCategory === 'image') {
			return 'Imagen';
		} else {
			return 'PDF';
		}
	}
</script>

<style>
	td, th {
		@apply p-2;
	}
</style>

<div class="flex justify-center flex-row flex-wrap justify-evenly container">
<!--
<div>
-->
	{#if isEvidenceUploadActive}
		<EvidenceUpload setNewEvidenceId={setNewEvidenceId}/>	
	{/if}

	{#if isEvidenceViewActive}
		<EvidenceDetail evidenceId={evidenceIdToShow} hideEvidenceDetail={hideViewEvidence} />
	{/if}

	{#if evidenceDataArray && evidenceDataArray.length > 0}
		<!-- w-full used to have data table columns aligned in CapaView -->
		<table class={allowEvidenceUpload ? "w-1/3 m-4 h-fit" : "w-full"}>
			<tr>
				<th class="w-3/5 bg-gray-400">Descripcion</th>
				<th class="w-1/4 bg-gray-400">Tipo</th>
				<th class="bg-none opacity-0 border-none"></th>
			</tr>
			{#each evidenceDataArray as evidenceData}
				<tr>
					<td>{evidenceData.description}</td>
					<td class="text-center">{fileTypeString(evidenceData.fileType)}</td>
					<td class="flex flex-row justify-center border-none">
						<button class="text-sm bg-gray-700 px-1 mx-1" on:click|preventDefault={() =>
							showViewEvidence(evidenceData._id)}>👁️</button>
						{#if isEditMode}
							<button class="text-sm bg-red-400 px-1 mx-1" on:click|preventDefault={() =>
								deleteEvidence(evidenceData._id)}>❌</button>
						{/if}
					</td>
				</tr>
			{/each}
		</table>
	{/if}

	<!--{#if isEditMode && isEvidenceUploadActive && evidenceDataArray.length>0}
		<button class="my-4" on:click|preventDefault={showAddEvidence}>Agregar evidencia</button>
	{/if}-->

</div>
