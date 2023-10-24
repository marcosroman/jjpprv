/*
 get evidence data (except for file binaries)
 for a given capaId and a section of the capa document.
 section could be: issue, response or correctiveaction (ca);
 in case section == correctiveaction, the correctiveActionIndex is also needed
*/
export async function getEvidenceDataFromCAPA(capaId, section, correctiveActionIndex) {
	let apiURL = `/api/capa/${capaId}`;
	if  (section === "correctiveactions") {
		apiURL += `/ca/${correctiveActionIndex}/evidence`;
	}
	else if (section === ("issue" || "response")) {
		apiURL += `/${section}/evidence`
	}

	const response = await fetch(apiURL);
	const body = await response.json();

	return body.evidenceArray;
}


/*
 get evidence data (including file binaries)
 for a given evidenceId and a section of the capa document.
*/
export async function getEvidenceDataFromEvidence(evidenceId) {
	const apiURL = `/api/evidence/${evidenceId}`
	const response = await fetch(apiURL);
	const body = await response.json();

	return body;
}
