import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';
import capas from '$lib/db/capas';

export async function DELETE({request, params}) {
	const capaId = params.capaId;
	const correctiveActionIndex = params.correctiveActionIndex;
	const evidenceIdToDelete = params.evidenceId;

	const documentSection = `correctiveActions.response.actions.${correctiveActionIndex}`;
	try {
		const requestData = await request.json();
		const evidenceIds = await requestData.evidenceIds;

		const remainingEvidenceIds = evidenceIds.filter(
			(id) => id != evidenceIdToDelete);

		const result = await capas.updateOne({_id: new ObjectId(capaId)},
			{$set:
				{[`${documentSection}.evidence`]:
					remainingEvidenceIds.map((id) => new ObjectId(id))}});

		return json({status: 204});
	} catch(error) {
		return json(error, {status: 400});
	}

}
