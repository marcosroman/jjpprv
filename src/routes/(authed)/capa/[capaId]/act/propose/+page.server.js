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

		let result = null;

		try {
			const capaId = formData.get('id');
			const proponentId = event.locals.user._id;
		
			let actions = [];
			const countActions = formData.get('count-actions');
			for (let i=0; i<countActions; i++) {
				let actionObject = {
						proposal: {
							proposalDate: new Date(),
							proponentId: new ObjectId(proponentId),
							proposedSolution: formData.get('proposed-solution-'+i),
							commitmentDate: new Date(formData.get('commitment-date-'+i))
						}
				};

				// include assignment data if provided
				// (and include auto-acceptance when proponent is the the assignee)
				let assigneeId = formData.get('assignee-user-'+i);
				if (assigneeId) {
					actionObject.proposal.assignment = {
						assigneeId: new ObjectId(assigneeId),
						assignmentDate: new Date(),
						comments: formData.get('comments-'+i)
					}

					if (assigneeId === proponentId) {
						actionObject.proposal.assignment.acceptance = {
							isAccepted: true,
							acceptanceDate: new Date(),
							comments: ""
						}
					}
				}
				actions.push(actionObject);
			}

			let setObject = { actions };
			const possibleRootCauses = formData.get('possible-root-causes');
			if (possibleRootCauses) {
				setObject["responseToNonConformity.possibleRootCauses"] = possibleRootCauses;
			}

			result = await capas.updateOne(
				{ _id: new ObjectId(capaId) },
				{ $set: setObject }
			);
		} catch (error) {
			console.log(error);
		}

		if (result) {
			throw redirect(302, '/');
		}
	}
}
