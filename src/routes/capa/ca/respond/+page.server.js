import capas from '$lib/db/capas';

export const load = async () => {
	const cursor = capas.find({
		$and: [
			{"correctiveActions": {$exists: true}},
			{"correctiveActions.isRequired": true},
			{"correctiveActions.response": {$exists: false}}
		]
	});

	const capasRequiringCorrectiveActionsAndWithouthResponse = await cursor.toArray();
	cursor.close();

	return {capasRequiringCorrectiveActionsAndWithouthResponse:
		JSON.parse(JSON.stringify(capasRequiringCorrectiveActionsAndWithouthResponse))};
}
