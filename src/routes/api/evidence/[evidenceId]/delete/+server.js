import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import evidences from '$lib/db/evidences';

export async function DELETE({params}) {
	const evidenceId = params.evidenceId;

	try {
		const result = await evidences.deleteOne({_id: new ObjectId(evidenceId)});

		return json({result},{status: 204});
	} catch (error) {
		return json(error,{status: 400});
	}
}
