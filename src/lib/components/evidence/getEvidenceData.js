/*
 get evidence data (except for file binaries)
 for a given capaId and a section of the capa document.
 section could be: issue, response or correctiveaction (ca);
 in case section == correctiveaction, the correctiveActionIndex is also needed
*/
export async function getEvidenceDataFromCAPA(capaId, section, correctiveActionIndex) {
	let apiURL = `/api/capa/${capaId}`;
	if (section === "correctiveactions") {
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


/*
 put new evidence id (newEvidenceId) in evidence id array
 in a given capa document with
 capaid, section and corectiveActionIndex (if section==="ca")
*/
export async function	updateAndGetEvidenceDataFromCAPA(capaId, section, correctiveActionIndex, newEvidenceId) {
	// (should use PUT method here, should be idempotent)
	// (and if there's no evidence, it shoud create the array!)
	
	// so first we update... then if that works fine, we get the data
	let apiURL = `/api/capa/${capaId}/${section}`;
	if (section === "correctiveactions") {
		apiURL += `/${correctiveActionIndex}/evidence/update`;
	}
	else if (section === ("issue" || "response")) {
		apiURL += `/evidence/update`;
	}

	const putData = { capaId, section, correctiveActionIndex, newEvidenceId };

	try {
		const response = await fetch(apiURL, {
			method: 'PUT', headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(putData)
		});

		if (response.ok) {
			//const data = await response.json();
			return getEvidenceDataFromCAPA(capaId, section, correctiveActionIndex);
		} else { console.error('Failed to send data to the server'); }
	} catch(error) {
		console.error('error');
	}

}

