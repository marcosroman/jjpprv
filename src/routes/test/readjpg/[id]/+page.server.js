import capas from '$lib/db/capas';
import {ObjectId} from 'mongodb'

export const load = async ({ params }) => {
	const capa = await capas.findOne({_id: new ObjectId(params.id)});

	return {imagen: new File('file', (new Blob(capa.imagen)).stream())}
}
