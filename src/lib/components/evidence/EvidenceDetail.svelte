<script>
	import { onMount } from 'svelte';
	import { getEvidenceDataFromEvidence } from './handleEvidenceData.js';

	export let evidenceId;
	export let hideEvidenceDetail;
	let evidenceData;

	onMount(async () => {
		evidenceData = await getEvidenceDataFromEvidence(evidenceId);
		console.log(evidenceData.fileName);
	});

	function openWindow() {
		const base64String = evidenceData.fileData;
		const base64Data = base64String.split(',')[1];
		const arrayBuffer = Uint8Array.from(
			atob(base64Data),
			c => c.charCodeAt(0)).buffer;

		const blob = new Blob([arrayBuffer],{ type: evidenceData.fileType });

		const url = URL.createObjectURL(blob, evidenceData.fileName);
		window.open(url);
		URL.revokeObjectURL(url);
	}
</script>

{#if evidenceData}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 opacity-100">
		<!--<div class="absolute inset-0 bg-gray-800 opacity-50">-->
    <div class="flex inset-0 p-6 w-3/4">
    	<div class="z-50 w-full bg-white p-6 rounded shadow-md flex flex-col items-center justify-center opacity-100">
				<iframe class="opacity-100 w-3/4 my-4 p-4 border-solid border-4 border-black" src={evidenceData.fileData} title={evidenceData.fileName} alt="evidence"></iframe>
				<button class="opacity-100 my-2" on:click={openWindow}>Abrir en <wbr>otra ventana</button>
				<button class="opacity-100 bg-gray-900 my-2" on:click={hideEvidenceDetail}>Cerrar</button>
			</div>
    </div>
  </div>
{/if}
