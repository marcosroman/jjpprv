<script>
	import EvidenceFormWithCapaView
		from '$lib/components/forms/EvidenceFormWithCapaView.svelte';

	export let data;

	const capaId = data.capaId;
	const documentSection = "responseToNonConformity.immediateActions";
	const isEditMode = true;
	const allowEvidenceUpload = true;

	const evidenceFormProps = {
		capaId, documentSection, isEditMode, allowEvidenceUpload
	};
</script>

<EvidenceFormWithCapaView {evidenceFormProps}/>
