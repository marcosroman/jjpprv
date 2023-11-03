import capas from '$lib/db/capas';

export const load = async () => {
	// get all capas without a response
	const cursor = capas.find({"response": {"$exists": false}});
	
	const capasPendingResponse = await cursor.toArray();
	await cursor.close();

	return {capasPendingResponse:
		JSON.parse(JSON.stringify(capasPendingResponse))}
}
