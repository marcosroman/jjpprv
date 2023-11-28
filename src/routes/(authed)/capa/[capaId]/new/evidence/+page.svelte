<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';

	export let data;

	const capaId = data.capaId;
	const documentSection = "issue";
</script>

<EvidenceList {capaId} {documentSection} isEditMode={true} />

<hr>
<CapaView {capaId}/>
