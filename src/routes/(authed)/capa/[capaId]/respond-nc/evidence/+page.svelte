<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';

	export let data;

	const isEditMode = true;
	const capaId = data.capaId;
	const documentSection = "responseToNonConformity.immediateActions";
</script>

<div class="flex flex-row flex-wrap mx-15 justify-evenly">
<EvidenceList {capaId} {documentSection} isEditMode={true} allowEvidenceUpload={true}/>
</div>
