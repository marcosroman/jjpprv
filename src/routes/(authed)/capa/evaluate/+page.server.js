import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';

export async function load() {
	const cursor = capas.find(
		{"evaluation.assignment": {$exists: true}},
		{"evaluation.isEffective": {$exists: false}}
	);

	const capasWithoutEvaluation = await cursor.toArray();
	cursor.close();

	return {capasWithoutEvaluation: toPOJO(capasWithoutEvaluation)};
}
