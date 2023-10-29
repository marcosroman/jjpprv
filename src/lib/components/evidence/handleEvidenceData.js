/*
 get evidence data (except for file binaries)
 for a given capaId and a section of the capa document (documentSection)
 documentSection could be: 'issue', 'response' or `correctiveActions.${caIndex}`
*/
export async function getEvidenceDataFromCAPA(capaId, documentSection) {
	let sectionSubURL = documentSection;
	if (documentSection.includes('correctiveActions')) {
		const caIndex = documentSection.split('.')[1];
		sectionSubURL = `ca/${caIndex}`;
	}
	const apiURL = `/api/capa/${capaId}/${sectionSubURL}/evidence`;

	try {
		const response = await fetch(apiURL);
		const body = await response.json();

		return body.evidence;
	} catch(error) { 
		console.error(error);
		return {};
	}
}

/*
 get evidence data (including file binaries)
 for a given evidenceId from the 'evidences' collection
*/
export async function getEvidenceDataFromEvidence(evidenceId) {
	const apiURL = `/api/evidence/${evidenceId}`;

	try {
		const response = await fetch(apiURL);
		const body = await response.json();

		return body;
	} catch(error) {
		console.error(error);
		return {};
	}
}


/*
 put new evidence id (newEvidenceId) in evidence id array
 in a given capa document with capaid, documentSection
*/
export async function	updateAndGetEvidenceDataFromCAPA(capaId, documentSection, newEvidenceId) {
	let sectionSubURL = documentSection;
	/*
	if (section.includes('correctiveActions')) {
		sectionSubURL = `ca/${section.split('.')[1]}`;
	}
	*/
	const apiURL = `/api/capa/${capaId}/${sectionSubURL}/evidence/update`;

	const putData = { capaId, documentSection, newEvidenceId };

	// so first we update... then if that works fine, we fetch the data
	try {
		const response = await fetch(apiURL, {
			method: 'PUT', headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(putData)
		}); // if there's no evidence yet, this creates the array

		if (response.ok) {
			//const data = await response.json();
			return getEvidenceDataFromCAPA(capaId, documentSection);
		} else {
			console.error('Response error');
			return [];
		}
	} catch(error) {
		console.error(error);
		return [];
	}
}

/*
 delete evidence data
 for a given capaId and a documentSection of the capa document
*/
export async function deleteEvidenceDataFromCAPA(capaId, documentSection, evidenceIdToDelete, evidenceIds) {
	let sectionSubURL = documentSection;
	if (documentSection.includes('correctiveActions')) {
		const caIndex = documentSection.split('.')[1]
		sectionSubURL = `ca/${caIndex}`;
	}
	const apiURL = `/api/capa/${capaId}/${sectionSubURL}/evidence/${evidenceIdToDelete}/delete`;

	const response = await fetch(apiURL, {
		method: 'DELETE',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({evidenceIds})
	});

	// TODO: FIX THIS, i don't like it... should do something with the response...
	//return body.evidenceArray;
	return getEvidenceDataFromCAPA(capaId, documentSection);
}


/*
 delete evidence data (including file binaries)
 from evidences collection
*/
export async function deleteEvidenceDataFromEvidence(evidenceId) {
	const apiURL = `/api/evidence/${evidenceId}/delete`;
	const response = await fetch(apiURL, { method: 'DELETE' });
	const body = await response.json();

	return await body;
}
