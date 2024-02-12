<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';

	export let data;

	const isEditMode = true;
	const capaId = data.capaId;
	const actionIndex = data.actionIndex;
	const documentSection = `actions.${actionIndex}`;
</script>

<EvidenceList
	isEditMode={isEditMode}
	capaId={capaId}
	documentSection={documentSection}
	allowEvidenceUpload
/>
