import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function GET() {
	// saved in capa for now, for testing purposes only
	const capa =  await capas.findOne({_id: new ObjectId("653108f3c8a406da91a73e61")});

	const imagen = `data:${capa.fileType};base64,${capa.file.toString('base64')}`;

	return json({imagen});
}


