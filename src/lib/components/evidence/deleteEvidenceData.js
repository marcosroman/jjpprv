import { getEvidenceDataFromCAPA } from './getEvidenceData.js';

/*
 delete evidence data
 for a given capaId and a section of the capa document
*/
export async function deleteEvidenceDataFromCAPA(capaId, section, evidenceIdToDelete, evidenceIds) {
	const apiURL = `/api/capa/${capaId}/${section}/evidence/${evidenceIdToDelete}/delete`;

	const response = await fetch(apiURL, {
		method: 'DELETE',
		//mode:
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({evidenceIds})
	});
	//const body = await response.json();

	//return body.evidenceArray;
	return getEvidenceDataFromCAPA(capaId, section);
}


/*
 delete evidence data (including file binaries)
 from evidences collection
*/
export async function deleteEvidenceDataFromEvidence(evidenceId) {
	const apiURL = `/api/evidence/${evidenceId}/delete`;
	const response = await fetch(apiURL, {
		method: 'DELETE',
		//mode:
		//headers: {"Content-Type": "application/json"},
		//body: JSON.stringify({evidenceIds})
	});
	const body = await response.json();

	return await body;
}
