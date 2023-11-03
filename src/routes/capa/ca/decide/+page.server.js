import capas from '$lib/db/capas';

export async function load() {
	const cursor = capas.find(
		{"correctiveActions": {"$exists": false}});

	const capasWithoutCorrectiveActions = await cursor.toArray();

	return {capasWithoutCorrectiveActions:
		JSON.parse(JSON.stringify(capasWithoutCorrectiveActions))};
}

