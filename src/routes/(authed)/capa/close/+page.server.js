import capas from '$lib/db/capas';

export async function load() {
	const cursor = capas.find({
		"evaluation.isEffective": {$exists: true},
		closure: {$exists: false}
	});

	const capasWithoutClosure = await cursor.toArray();
	cursor.close();

	return {capas:
		JSON.parse(JSON.stringify(capasWithoutClosure))};
}
