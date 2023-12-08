import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb'; 
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const capa = await capas.findOne({_id: new ObjectId(params.capaId)});
	const now = new Date();

	return {
		capa: JSON.parse(JSON.stringify(capa)),
		now
	};
} 

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
							proponentId: new ObjectId(event.locals.user._id),
							proposedSolution: formData.get('proposed-solution-'+i),
							commitmentDate: new Date(formData.get('commitment-date-'+i))
						}
					});
			}

			let setObject = { actions };
			const possibleRootCauses = formData.get('possible-root-causes');
			if (possibleRootCauses) {
				setObject["responseToNonConformity.possibleRootCauses"] = possibleRootCauses;
			}

			await capas.updateOne(
				{ _id: new ObjectId(capaId) },
				{ $set: setObject }
			);

			console.log('response saved! ', capaId);
		} catch (error) {
			console.log(error);
		}

		throw redirect(303, "/");
	}
}
