import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';

export const load = async ({params}) => {
	const capaId = params.capaId;
	// get all capas having correctiveActions with no evidence
	
	const capaWithCorrectiveActionsPendingEvidence = await capas.findOne(
		{ _id: new ObjectId(capaId) },
		{ correctiveActions: 1});

	const correctiveActionsArray = capaWithCorrectiveActionsPendingEvidence.correctiveActions.response.actions;
	console.log(correctiveActionsArray);

	return {capaId, correctiveActionsArray:
		JSON.parse(JSON.stringify(correctiveActionsArray))}
}
