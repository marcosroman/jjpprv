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
			let setObject = {}; // to do the update (used in updateOne method)

			let responseObject = {
				responseDate: new Date(),
				immediateActions: formData.get('immediate-actions'),
				consequences: formData.get('consequences')
			};
			
			// if responder says corrective action is required, we add the pertinent data
			if(formData.get('is-ca-required')) {
				responseObject.isCorrectiveActionRequired = true;
				responseObject.possibleRootCauses = formData.get('possible-root-causes');

				let correctiveActionsArray = [];
				const countCorrectiveActions = formData.get('count-corrective-actions');
				for (let i=0; i<countCorrectiveActions; i++) {
					correctiveActionsArray.push({
						solution: formData.get('solution-'+i),
						commitmentDate: new Date(formData.get('commitment-date-'+i))
					});
				}
				setObject = {
					response: responseObject,
					correctiveActions: correctiveActionsArray
				};
			} else {
				responseObject.isCorrectiveActionRequired = false;
				setObject = {
					response: responseObject
				};
			}
			console.log(responseObject);

			await capas.updateOne(
				{ _id: new ObjectId(formData.get('id')) },
				{ "$set": setObject });


			console.log('response saved!');
		} catch (error) {
			console.log(error);
		}

		throw redirect(303, "/");
	}
}
