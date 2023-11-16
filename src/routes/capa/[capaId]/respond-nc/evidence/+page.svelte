<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';

	export let data;

	const isEditMode = true;
	const capaId = data.capaId;
	const documentSection = "responseToNonConformity";
</script>

<EvidenceList {capaId} {documentSection} isEditMode={true}/>
