import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';

export const load = async () => {
	// get all capas where isNonConformity===true AND there's no responseToNonConformity
	const cursor = capas.find({
		"issue.isNonConformity": true,
		"responseToNonConformity": {"$exists": true},
		"responseToNonConformity.evidence": {"$exists": false},
	});
	
	const capasWithNCPendingEvidence = await cursor.toArray();
	await cursor.close();

	return {capasWithNCPendingEvidence :
		toPOJO(capasWithNCPendingEvidence )}
}
