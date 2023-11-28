import capas from '$lib/db/capas';

export const load = async () => {
	// get capas that are either (no-conformity AND requireCorrectiveActions) 
	// OR that are not non-conformities (but simply improvemente opportunities)
	// ...not having actions yet
	const cursor = capas.find(
		{
			$and: [
				{
					$or: [
					{$and: [
						{"issue.isNonConformity": true},
						{"correctiveActionsRequirement.isRequired": true}
					]},
					{"issue.isNonConformity": false}
					]
				},
				{"actions": {$exists: false}}
			]
	}
	);

	const capasRequiringActionsAndWithoutProposal = await cursor.toArray();
	cursor.close();

	return {capasRequiringActionsAndWithoutProposal:
		JSON.parse(JSON.stringify(capasRequiringActionsAndWithoutProposal))};
}
