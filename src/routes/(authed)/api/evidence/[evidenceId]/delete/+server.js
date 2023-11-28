import evidences from '$lib/db/evidences';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export async function DELETE({params}) {
	const evidenceId = params.evidenceId;

	try {
		const result = await evidences.deleteOne({_id: new ObjectId(evidenceId)});

		return json({status: 204});
	} catch (error) {
		return json(error, {status: 400});
	}
}
