import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb'; 
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	const capa = await capas.findOne({_id: new ObjectId(params.capaId)});
	const now = new Date();

	return {
		user: locals.user,
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
				let actionObject = {
						proposal: {
							proposalDate: new Date(),
							proponentId: new ObjectId(event.locals.user._id),
							proposedSolution: formData.get('proposed-solution-'+i),
							commitmentDate: new Date(formData.get('commitment-date-'+i))
						}
				};
				if (formData.get('asignee-user-'+i) !== null) {
					actionObject.proposal.assignment = {
						assigneeId: formData.get('asignee-user-'+i),
						assignmentDate: new Date(),
						comments: formData.get('comments-'+i)
					}
				}

				actions.push(actionObject);
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

			console.log(setObject);
			console.log('response saved! ', capaId);
		} catch (error) {
			console.log(error);
		}

		throw redirect(303, "/");
	}
}
