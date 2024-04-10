import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb'; 
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	const capa = await capas.findOne({_id: new ObjectId(params.capaId)});
	const user = locals.user;

	return {
		capa: toPOJO(capa),
		actionIndex: params.actionIndex,
		user
	};
} 

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		try {
			const capaId = formData.get('id');
			const actionIndex = formData.get('action-index');

			// TODO: include automatic acceptance if user._id === assignee-id === proponent-id
			// here i need capa info... what i want to compare
			// is the proposal.assignment.assigneeId and the proposal.proponentId...
			// if they are equal, then i can add the 'acceptance' part right now too
			let assignmentUpdateObject = {};
			if (formData.get('proponent-id')  === formData.get('assignee-id')) {
				assignmentUpdateObject[`actions.${actionIndex}.proposal.assignment`] = {
					assigneeId: new ObjectId(formData.get(`assignee-id`)),
					assignmentDate: new Date(),
					comments: formData.get(`comments`),
					acceptance: {
						isAccepted: true,
						acceptanceDate: new Date(),
						comments: formData.get('comments')
					}
				};
			} else {
				assignmentUpdateObject[`actions.${actionIndex}.proposal.assignment`] = {
							assigneeId: new ObjectId(formData.get(`assignee-id`)),
							assignmentDate: new Date(),
							comments: formData.get(`comments`)
				};
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
