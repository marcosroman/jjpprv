import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';

export async function load() {
	const cursor = capas.find({
		"issue.isNonConformity": true,
		"correctiveActionsRequirement": {"$exists": false}
	});

	const capasWithoutCorrectiveActionsRequirement = await cursor.toArray();

	return {capasWithoutCorrectiveActionsRequirement:
		toPOJO(capasWithoutCorrectiveActionsRequirement)};
}

