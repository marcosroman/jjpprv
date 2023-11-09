<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';

	export let data;

	const isEditMode = true;
	const capaId = data.capaId;
	const documentSection = "response";
</script>

<p>{capaId}</p>
<p>{documentSection}</p>
<EvidenceList isEditMode={isEditMode} capaId={capaId} documentSection={documentSection}/>
