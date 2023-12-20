import capas from '$lib/db/capas';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export async function GET({ params }) {
	const capaId = params.capaId;
	const section = params.section;

	// only allowed for 'issue' section
	if (section === 'issue') {
		try {
			console.log('running update query...');
			const result = await capas.updateOne(
				{ _id: new ObjectId(capaId) },
				{ $set: { "issue.evidence": null } }
			);
			console.log('result: ', result);

			return json({result}, {status: 200});
		} catch(error) {
			console.error(error);
			return json({error}, {status: 400});
		}
	} /*else {
		return json({status: 400});
	}*/
}
