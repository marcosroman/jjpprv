import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';

// get commit date, give form with new options... may include previous data (action may not be changed, only commit date and assignee)... previous values will be given, can choose new ones --- 
export async function load({ params, locals }) {
	const capaId = params.capaId;
	const actionIndex = params.actionIndex;

	const capa = await capas.findOne({_id: new ObjectId(capaId)});

	return {
		user: locals.user,
		capa: JSON.parse(JSON.stringify(capa)),
		actionIndex
	}
}

