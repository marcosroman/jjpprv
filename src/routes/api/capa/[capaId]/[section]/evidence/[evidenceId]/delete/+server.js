import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';
import capas from '$lib/db/capas';

export async function DELETE({request, params}) {
	const capaId = params.capaId;
	const section = params.section;
	const evidenceIdToDelete = params.evidenceId; // or is it request data?
	const evidenceIds = request.evidenceIdArray;

	const remainingEvidenceIds = evidenceIds.filter((id) => id != evidenceIdToDelete);

	// first i need to get the list... or maybe i can receive the list in params???
	const result = await capas.updateOne({_id: new ObjectId(capaId)},
		{$set: {[`${section}.evidence`]: remainingEvidenceIds.map((id) => new ObjectId(id))}});

	return json(result);
}
