import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';

export async function load({params}) {
	const capaId = params.capaId;
	const capa = await capas.findOne({_id: new ObjectId(capaId)});

	return {capa:
		JSON.parse(JSON.stringify(capa))};
}
