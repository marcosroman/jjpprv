import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const capaId = params.capaId;

	try {
		const capa = await capas.findOne({ _id: new ObjectId(capaId) });

		return json(capa, {status: 200});
	} catch(error) {
		return json(error, {status:400});
	}
}
