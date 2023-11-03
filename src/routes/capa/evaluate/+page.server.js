import capas from '$lib/db/capas';

export async function load() {
	const cursor = capas.find({
		evaluation: {
			$exists: false}});

	const capasWithoutEvaluation = await cursor.toArray();
	cursor.close();

	return {capasWithoutEvaluation: JSON.parse(JSON.stringify(capasWithoutEvaluation))};
}
