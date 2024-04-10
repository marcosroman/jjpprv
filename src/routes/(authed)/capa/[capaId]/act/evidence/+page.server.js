import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb'; 
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const capa = await capas.findOne({_id: new ObjectId(params.capaId)});

	return {capa: toPOJO(capa)};
} 

/*
export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		try {
			const capaId = formData.get('id');
		
			let actions = [];
			const countActions = formData.get('count-actions');
			for (let i=0; i<countActions; i++) {
				actions.push(
					{
						proposal: {
							proposalDate: new Date(),
							proponentId: null,
							proposedSolution: formData.get('proposed-solution-'+i),
							commitmentDate: new Date(formData.get('commitment-date-'+i))
					}
				});
			}

			await capas.updateOne(
				{ _id: new ObjectId(capaId) },
				{ $set: { actions }}
			);

			console.log('response saved! ', capaId);
		} catch (error) {
			console.log(error);
		}

		throw redirect(303, "/");
	}
}
*/
