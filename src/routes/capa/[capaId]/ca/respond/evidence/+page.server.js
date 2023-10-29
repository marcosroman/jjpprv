import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';

export const load = async ({params}) => {
	const capaId = params.capaId;
	// get all capas having correctiveActions with no evidence
	
	/*
	const cursor = capas.aggregate([
    { $match: { "correctiveActions": {
				$elemMatch: {"evidence": { $exists: false }}}}}
	]);
	
	const evidenceToCorrectiveActionsPendingCAPAs = await cursor.toArray();
	*/
	//await .close();
	
	const capaCAs = await capas.findOne({ _id: new ObjectId(capaId) },{ correctiveActions: 1});

	const caArray = capaCAs.correctiveActions;

	//console.log(evidenceToCorrectiveActionsPendingCAPAs);

	return {capaId, caArray:
		JSON.parse(JSON.stringify(caArray))}
}
