import capas from '$lib/db/capas';
import {ObjectId} from 'mongodb'; 
import {redirect} from '@sveltejs/kit';

export const load = async ({params}) => {
	const capa = await capas.findOne({_id: new ObjectId(params.capaId)});

	return {capa: JSON.parse(JSON.stringify(capa))};
} 

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		try {
			const capaId = formData.get('id');

			let response = {
				responseDate: new Date(),
				possibleRootCauses: formData.get('possible-root-causes')
				//responderId,
			};
			
			let actions = [];
			const countCorrectiveActions = formData.get('count-corrective-actions');
			for (let i=0; i<countCorrectiveActions; i++) {
				actions.push({
					solution: formData.get('solution-'+i),
					commitmentDate: new Date(formData.get('commitment-date-'+i))
				});
			}
			response.actions = actions;

			console.log(response);

			await capas.updateOne(
				{ _id: new ObjectId(capaId) },
				{ $set: {
					correctiveActions: { response }
				}});

			console.log('response saved! ', capaId);
		} catch (error) {
			console.log(error);
		}

		throw redirect(303, "/");
	}
}
