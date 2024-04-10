import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb'; 
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const actionIndex = params.actionIndex;
	const capaId = params.capaId;
	const capa = await capas.findOne({_id: new ObjectId(capaId)});

	return {
		capa: toPOJO(capa),
		actionIndex
	};
} 

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		let result = null;
		try {
			const capaId = formData.get('id');
			const actionIndex = formData.get('action-index');

			const acceptanceUpdateObject = {
						isAccepted: true,
						acceptanceDate: new Date(),
						comments: formData.get(`comments`)
			}

			result = await capas.updateOne(
				{ _id: new ObjectId(capaId) },
				{ $set: {[`actions.${actionIndex}.proposal.assignment.acceptance`]: acceptanceUpdateObject} }
			);
			console.log('result:', result);
		} catch (error) {
			console.log(error);
		}

		if (result) {
			throw redirect(302, "/");
		}
	}
}
