import capas from '$lib/db/capas';

export const load = async () => {
	// get capas that are either (no-conformity AND requireCorrectiveActions) 
	// OR that are not non-conformities (but simply improvemente opportunities)
	const cursor = capas.find(
		{actions: {$exists: true}},
		{actions: {$elemMatch: {assignment: {$exists: false}}}}
		//{"actions.assignment": {$elemMatch: {$exists: false}}}
	);

	const capasWithActionsPendingAssignment = await cursor.toArray();
	cursor.close();

	return {capasWithActionsPendingAssignment :
		JSON.parse(JSON.stringify(capasWithActionsPendingAssignment))};
}
