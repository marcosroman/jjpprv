//import capas from '$lib/db/capas';
//import { ObjectId } from 'mongodb';

export async function load({params}) {
	const capaId = await params.capaId;
	//const capa = await capas.findOne({_id: new ObjectId(capaId)});

	return {capaId};
		/*
		capa:
		JSON.parse(JSON.stringify(capa))};
		*/
}