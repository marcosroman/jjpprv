import capas from '$lib/db/capas';

export const load = async () => {
	const cursor = capas.find({
		actions: {
			$exists: true,
			$elemMatch: {
				"proposal.assignment.acceptance": {$exists: true},
				evidence: {$exists: true},
				review: {$exists: false}
			}
		}
	});

	const capasWithActionsAssignedAndAcceptedWithEvidencePendingReview = await cursor.toArray();
	cursor.close();

	return {capasWithActionsAssignedAndAcceptedWithEvidencePendingReview:
		JSON.parse(JSON.stringify(capasWithActionsAssignedAndAcceptedWithEvidencePendingReview))};
}
