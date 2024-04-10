import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb'; 
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	const capa = await capas.findOne({_id: new ObjectId(params.capaId)});
	const user = locals.user;

	return {
		capa: toPOJO(capa),
		user
	};
} 

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		try {
			const capaId = formData.get('id');
			const actionsCount = formData.get('actions-count');

			let assignmentUpdateObject = {};
			for (let i=0; i<actionsCount; i++) {
				assignmentUpdateObject[`actions.${i}.proposal.assignment`] = {
						assigneeId: new ObjectId(formData.get(`assignee-user-${i}`)),
						assignmentDate: new Date(),
						comments: formData.get(`comments-${i}`)
				}
			}

			const result = await capas.updateOne(
				{ _id: new ObjectId(capaId) },
				{ $set: assignmentUpdateObject }
			);

		} catch (error) {
			console.log(error);
		}

		throw redirect(303, "/");
	}
}
