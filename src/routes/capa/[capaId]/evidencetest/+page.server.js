export function load({ params }) {
	/*
	const response = await fetch(`/api/capa/${params.capaId}/evidence/issue`);
	const evidence = await response.json();
	*/
	const capaId = params.capaId;

	return { capaId };
}

/*
function getEvidenceIdArray(capaId, section, correctiveActionIndex) {
		// get evidence array for a given capaId and a section of the capa document
		// section could be: issue, response or correctiveaction;
		// in case section == correctiveaction, the correctiveactionindex is also needed
		fetch(`/api/capa/${capaId}/evidence/issue`)
	

		return 0;//... devolver el array
	}
*/
