import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function load({params}) {
	return {...params};
}

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const capaId = data.get('capa-id');
		const assignerId = new ObjectId(event.locals.user._id);
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
