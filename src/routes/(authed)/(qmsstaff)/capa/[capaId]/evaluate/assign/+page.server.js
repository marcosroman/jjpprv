import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';

export async function load({params, locals}) {
	return {...params, user: locals.user};
}

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const capaId = data.get('capa-id');
		const assignerId = event.locals.user._id;
		const evaluatorId = data.get('evaluator-id');

		let result;
		try {
			result = await capas.updateOne({_id: new ObjectId(capaId)}, {
				$set: {
					evaluation: {
						assignment: {
							assignerId: new ObjectId(assignerId),
							evaluatorId: new ObjectId(evaluatorId),
							assignationDate: new Date()
						}
					}
				}
			});
		} catch(error) {
			console.error(error);
		}

		if (result) {
			throw redirect(302,'/');
		}
	}
}
