import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';
import { ObjectId} from 'mongodb'; 
import { redirect} from '@sveltejs/kit';

export async function load({params}) {
	const capaId = params.capaId;
	const capa = await capas.findOne({_id: new ObjectId(capaId)});

	return {capa: toPOJO(capa)};
} 

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		try {
			await capas.updateOne(
				{ _id: new ObjectId(formData.get('id')) },
				{ "$set": {
					responseToNonConformity: {
						responseDate: new Date(),
						responderId: new ObjectId(event.locals.user._id),
						immediateActions: {
							proposedSolution: formData.get('proposed-immediate-solution')//,
							//evidence: []
						},
						possibleConsequences: formData.get('consequences'),
					}
				}});
		} catch (error) {
			console.log(error);
		}

		throw redirect(303, "/");
	}
}
