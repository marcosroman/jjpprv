/*
 get evidence data (except for file binaries)
 for a given capaId and a section of the capa document.
 section could be: issue, response or correctiveaction (ca);
 in case section == correctiveaction, the correctiveActionIndex is also needed
*/
export async function getEvidenceData(capaId, section, correctiveActionIndex) {
	let apiURL = `/api/capa/${capaId}`;
	if  (section === "correctiveactions") {
		apiURL += `/ca/${correctiveActionIndex}/evidence`;
	}
	else if (section === ("issue" || "response")) {
		apiURL += `/${section}/evidence`
	}

	const response = await fetch(apiURL);
	const body = await response.json();

	return body.evidence;
}

export async function getEvidenceData() {

}
