import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';

export async function load({ params, locals }) {
	const capaId = params.capaId;
	const actionIndex = params.actionIndex;

	const capa = await capas.findOne({_id: new ObjectId(capaId)});

	return {
		user: locals.user,
		capaId,
		actionIndex,
		action: JSON.parse(JSON.stringify(capa.actions[actionIndex]))
	}
}


export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		try {
			const capaId = formData.get('id');
			const actionIndex = formData.get('action-index');

			const acceptanceUpdateObject = {
						isAccepted: true,
						acceptanceDate: new Date(),
						comments: formData.get(`comments`)
			}

			const result = await capas.updateOne(
				{ _id: new ObjectId(capaId) },
				{ $set: {[`actions.${actionIndex}.reschedule.assignment.acceptance`]: acceptanceUpdateObject} }
			);
			console.log('result:', result);
	} catch (error) {
		console.log(error);
	}

	//throw redirect(303, "/");
	}
}

