import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';

export const load = async () => {
	// get capas that are either (no-conformity AND requireCorrectiveActions) 
	// OR that are not non-conformities (but simply improvemente opportunities)
	const cursor = capas.find({
		actions: {$exists: true},
		actions: {$elemMatch: {assignment: {$exists: false}}}
	});

	const capasWithActionsPendingAssignment = await cursor.toArray();
	cursor.close();

	return {capasWithActionsPendingAssignment :
		toPOJO(capasWithActionsPendingAssignment)};
}
