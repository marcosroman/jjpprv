import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';
//import { ObjectId } from 'mongodb';

export async function load() {
	const cursor = capas.find({
		"evaluation.assignment": {$exists: false}
	});

	const capasWithAllActionsReviewedPendingEvaluation = await cursor.toArray();

	return {capasWithAllActionsReviewedPendingEvaluation:
		toPOJO(capasWithAllActionsReviewedPendingEvaluation)}
}
