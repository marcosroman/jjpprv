import capas from '$lib/db/capas';
//import { ObjectId } from 'mongodb';

export async function load() {
	const cursor = capas.find({
		"actions": {
			$not: { $elemMatch: { "review.isAccomplished": { $exists: false } } }
		}
	});

	const capasWithAllActionsReviewedPendingEvaluation = await cursor.toArray();

	return {capasWithAllActionsReviewedPendingEvaluation:
		JSON.parse(JSON.stringify(capasWithAllActionsReviewedPendingEvaluation))}
}
