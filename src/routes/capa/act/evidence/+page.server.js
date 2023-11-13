import capas from '$lib/db/capas';

export const load = async () => {
	const cursor = capas.find({
		actions: {
			$exists: true,
			$elemMatch: {
				"proposal.assignment.acceptance": {$exists: true},
				evidence: {$exists: false}
			}
		}
	});

	const capasWithActionsAssignedAndAcceptedPendingEvidence = await cursor.toArray();
	cursor.close();

	return {capasWithActionsAssignedAndAcceptedPendingEvidence:
		JSON.parse(JSON.stringify(capasWithActionsAssignedAndAcceptedPendingEvidence))};
}
