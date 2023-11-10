import capas from '$lib/db/capas';

export const load = async () => {
	// get capas that are either (no-conformity AND requireCorrectiveActions) 
	// OR that are not non-conformities (but simply improvemente opportunities)
	const cursor = capas.find({
		$or: [
			{$and: [
				{"issue.isNonConformity": true},
				{"correctiveActionsRequirement.isRequired": true}
			]},
			{"issue.isNonConformity": false}
	]});

	const capasRequiringActionsAndWithoutProposal = await cursor.toArray();
	cursor.close();

	return {capasRequiringActionsAndWithoutProposal:
		JSON.parse(JSON.stringify(capasRequiringActionsAndWithoutProposal))};
}
