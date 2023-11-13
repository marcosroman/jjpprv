// used below to return a subsection of the url
// for doing api calls, having as input the
// document section (issue, response to nc or action)
function sectionSubURL(documentSection) {
	let sectionSubURL = documentSection;

	if (documentSection.includes('actions')) {
		// in this case, documentSection === actions.{actionIndex}
		const actionIndex = documentSection.split('.')[1];
		sectionSubURL = `action/${actionIndex}`;
	}

	return sectionSubURL;
}

/*
 get evidence data (except for file binaries)
 for a given capaId and a section of the capa document (documentSection)
 documentSection could be: 'issue', 'responseToNonConformity'
 (in case the capa is a NC) or `actions.${actionIndex}`
*/
export async function getEvidenceDataFromCAPA(capaId, documentSection) {
	const sectionSubURL = sectionSubURL(documentSection);
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
	const sectionSubURL = sectionSubURL(documentSection);
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
export async function deleteEvidenceDataFromCAPA(
	capaId, documentSection, evidenceIdToDelete, evidenceIds) {
	const sectionSubURL = sectionSubURL(documentSection);
	const apiURL = `/api/capa/${capaId}/${sectionSubURL}/evidence/${evidenceIdToDelete}/delete`;

	const response = await fetch(apiURL, {
		method: 'DELETE',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({evidenceIds})
	});

	if (response.ok) {
		return getEvidenceDataFromCAPA(capaId, documentSection);
	} else {
		console.error('error deleting evidence');
	}
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
