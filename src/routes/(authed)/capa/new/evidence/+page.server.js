import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';

export const load = async () => {
	// get all capas without a evidence for their issue
	const cursor = capas.find(
		{"issue": {"$exists": true},
		"issue.evidence": {"$exists": false}});
	
	const evidenceToIssuePendingCapas = await cursor.toArray();
	await cursor.close();

	return {evidenceToIssuePendingCapas:
		toPOJO(evidenceToIssuePendingCapas)}
}

