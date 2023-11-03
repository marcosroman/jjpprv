import capas from '$lib/db/capas';

export const load = async () => {
	// get all capas without a evidence for their response
	const cursor = capas.find(
		{"response": {"$exists": true},
		"response.evidence": {"$exists": false}});
	
	const capasPendingEvidenceToResponse= await cursor.toArray();
	await cursor.close();

	return {capasPendingEvidenceToResponse:
		JSON.parse(JSON.stringify(capasPendingEvidenceToResponse))}
}
