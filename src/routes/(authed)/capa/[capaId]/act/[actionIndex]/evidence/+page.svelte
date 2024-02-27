<script>
	import EvidenceFormWithCapaView
		from '$lib/components/forms/EvidenceFormWithCapaView.svelte';

	export let data;

	const capaId = data.capaId;
	const documentSection = `actions.${actionIndex}`;
	const isEditMode = true;
	const allowEvidenceUpload = true;
	const actionIndex = data.actionIndex;

	const evidenceFormProps = {
		capaId, documentSection, isEditMode,
		allowEvidenceUpload, actionIndex
	};
</script>

<EvidenceFormWithCapaView {evidenceFormProps}/>
