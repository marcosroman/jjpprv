import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';

export const load = async () => {
	const cursor = capas.find(
		{actions: {$exists: true}},
		{actions: {$elemMatch: {assignment: {$exists: true}}}},
		{actions: {$elemMatch: {"assignment.acceptance": {$exists: false}}}}
	);

	const capasWithAssignedActionsPendingAcceptance = await cursor.toArray();
	cursor.close();

	return {capasWithAssignedActionsPendingAcceptance :
		toPOJO(capasWithAssignedActionsPendingAcceptance)};
}
