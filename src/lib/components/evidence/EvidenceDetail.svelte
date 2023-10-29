<script>
	import { onMount } from 'svelte';
	import { getEvidenceDataFromEvidence } from './handleEvidenceData.js';

	export let evidenceId;
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

<p>{evidenceId}</p>
{#if evidenceData}
	<p>{evidenceData.fileType}</p>
	<p>{evidenceData.fileName}</p>
	<p>name={evidenceData.fileName}, DESC= {evidenceData.description}, TYPE={evidenceData.fileType}</p>
	<iframe src={evidenceData.fileData} title="desc" alt='pdf'></iframe>
	<button on:click={openWindow}>Ver</button>
{/if}
