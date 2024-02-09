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
    <div class="flex inset-0 h-3/4 w-1/2">
    	<div class="z-50 w-full bg-white rounded shadow-md flex flex-col items-center justify-center opacity-100">
					<!--"aspect-auto h-1/3 w-3/4 my-4 p-4 border-solid border-black"-->
					{#if evidenceData.fileType.split('/')[0] === 'image'}
						<div class="h-full w-1/2 my-4 p-4 border-2 rounded border-solid border-black flex justify-center align-center">
							<img alt="evidence" class="" src={evidenceData.fileData}>
						</div>
					{:else}
						<iframe class="opacity-100 h-full w-1/2 my-4 p-4 border-solid border-4 border-black" src={evidenceData.fileData} title={evidenceData.fileName} alt="evidence"></iframe>
					{/if}
				<p class="p-4 m-4">{evidenceData.description}</p>
				<div class="flex flex-row flex-wrap justify-evenly p-4 w-1/2">
					<button class="opacity-100 my-2" on:click={openWindow}>Abrir en <wbr>otra ventana</button>
					<button class="opacity-100 bg-gray-900 my-2" on:click={hideEvidenceDetail}>Cerrar</button>
				</div>
			</div>
    </div>
  </div>
{/if}
