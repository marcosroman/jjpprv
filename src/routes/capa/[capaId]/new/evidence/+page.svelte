<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';

	export let data;

	const isEditMode = true;
	const capaId = data.capaId;
	const documentSection = "issue";
</script>

<CapaView {capaId}/>
<hr>
<EvidenceList isEditMode={isEditMode} capaId={capaId} documentSection={documentSection}/>
