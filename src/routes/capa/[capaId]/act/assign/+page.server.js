import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb'; 
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const capa = await capas.findOne({_id: new ObjectId(params.capaId)});

	return {capa: JSON.parse(JSON.stringify(capa))};
} 

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		try {
			const capaId = formData.get('id');
			const actionsCount = formData.get('actions-count');

			let assignmentUpdateObject = {};
			for (let i=0; i<actionsCount; i++) {
				assignmentUpdateObject[`actions.${i}.proposal.assingment`] = {
						responsibleId: formData.get(`responsible-user-${i}`),
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