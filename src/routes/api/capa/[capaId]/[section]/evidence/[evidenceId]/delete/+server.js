import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';
import capas from '$lib/db/capas';

export async function DELETE({request, params}) {
	const capaId = params.capaId;
	const section = params.section;
	const evidenceIdToDelete = params.evidenceId;

	try {
		const requestData = await request.json();
		const evidenceIds = await requestData.evidenceIds;

		const remainingEvidenceIds = evidenceIds.filter(
			(id) => id != evidenceIdToDelete);

		const result = await capas.updateOne({_id: new ObjectId(capaId)},
			{$set:
				{[`${section}.evidence`]:
					remainingEvidenceIds.map((id) => new ObjectId(id))}});

		return json(result, {status: 402});
	} catch(error) {
		return json(error, {status: 400});
	}
}
