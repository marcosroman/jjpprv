import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function GET({params}) {
	const capaId = params.capaId;
	const actionIndex = params.actionIndex;

	try {
		const action = (await capas.findOne({_id: new ObjectId(capaId)}))?.actions[actionIndex];

		return json(action, {status: 200});
	} catch(error) {
		return json(error, {status: 400});
	}
}
