<script>
	import EvidenceList from '$lib/components/evidence/EvidenceList.svelte';

	async function getEvidenceIdArray(capaId, section, correctiveActionIndex) {
		// get evidence array for a given capaId and a section of the capa document
		// section could be: issue, response or correctiveaction;
		// in case section == correctiveaction, the correctiveactionindex is also needed
		const res = await fetch(`/api/capa/${capaId}/evidence/issue`);
		/*
		fetch(`/api/capa/${capaId}/evidence/response`)
		fetch(`/api/capa/${capaId}/evidence/correctiveaction/${correctiveActionIndex}`)
		*/
	

		return res;//... devolver el array
	}

</script>

<EvidenceList isEditMode={1} evidenceIdArray={getEvidenceIdArray("6534536fec2e43e993434c6f", "issue", null)}/>
