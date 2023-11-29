import capas from '$lib/db/capas';

export const load = async () => {
	// get all capas where isNonConformity===true AND there's no responseToNonConformity
	const cursor = capas.find({
		"issue.isNonConformity": true,
		"responseToNonConformity": {"$exists": false}
	});
	
	const capasPendingResponseToNC = await cursor.toArray();
	await cursor.close();

	return {capasPendingResponseToNC:
		JSON.parse(JSON.stringify(capasPendingResponseToNC))}
}
