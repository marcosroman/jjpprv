import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function GET() {
	// saved in capa for now, for testing purposes only
	const capa =  await capas.findOne({_id: new ObjectId("653171afb91ae278dd6825a4")});

	const pdf = `data:${capa.fileType};base64,${capa.file.toString('base64')}`;

	return json({pdf});
}

