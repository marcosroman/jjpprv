<script>
	export let data;
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';
	let capaId = data.capaId;
</script>

<EvidenceList capaId={capaId} documentSection="issue" isEditMode={true}/>
