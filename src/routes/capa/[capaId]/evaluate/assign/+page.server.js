import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function load({params}) {
	/*
	const capaId = params.capaId;
	const capaIdObject = new ObjectId(capaId);

	const capa = await capas.findOne({_id: capaIdObject});

	return {capa: JSON.parse(JSON.stringify(capa))};
	*/
	return {...params};
}

export const actions = {
	default: async ({request}) => {
		const data = await request.formData();

		const capaId = data.get('capa-id');
		const assignerId = data.get('assigner-id');
		const evaluatorId = data.get('evaluator-id');

		const capaIdObject = new ObjectId(capaId);

		try {
			const result = await capas.updateOne({_id: capaIdObject},
				{$set: {
					evaluation: {
						assignment: {
							assignerId, evaluatorId,
							assignationDate: new Date()
						}
					}
				}}
			);

			//return json({status: 200});
		} catch(error) {
			console.error(error);
			//return json(error, {status: 400});
		}
	}
}
