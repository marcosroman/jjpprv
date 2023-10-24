<script>
	import { onMount } from 'svelte';
	import { getEvidenceDataFromEvidence } from './getEvidenceData.js';

	export let evidenceId;
	let evidenceData;

	onMount(async () => {
		evidenceData = await getEvidenceDataFromEvidence(evidenceId);
	});
</script>

<p>{evidenceId}</p>
<p>{JSON.stringify(evidenceData)}</p>
<!--
<p>{evidenceData.fileName}</p>
<p>{evidenceData.fileType}</p>
-->

