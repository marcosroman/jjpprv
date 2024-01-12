import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';

// get commit date, give form with new options... may include previous data
// (action may not be changed, only commit date and assignee)... previous values will be given, can choose new ones --- 
export async function load({ params, locals }) {
	const capaId = params.capaId;
	const actionIndex = params.actionIndex;

	const capa = await capas.findOne({_id: new ObjectId(capaId)});

	return {
		user: locals.user,
		capa: JSON.parse(JSON.stringify(capa)),
		actionIndex
	}
}

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const capaId = formData.get('capa-id');
		const actionIndex = formData.get('action-index');
		const proponentId = formData.get('proponent-id');
		const rescheduledCommitmentDate = formData.get('new-commitment-date');
		const assigneeId = formData.get('assignee-id');
		const comments = formData.get('comments');

		// if assignee is issuer, set acceptance of task|action too
		let setObject = {};
		if (proponentId === assigneeId) {
			setObject = {
				[`actions.${actionIndex}.reschedule`]: {
					rescheduleDate: new Date(),
					reschedulerId: new ObjectId(event.locals.user._id),
					rescheduledCommitmentDate: new Date(rescheduledCommitmentDate),
					assignment: {
						assigneeId: new ObjectId(assigneeId),
						assignmentDate: new Date(),
						comments,
						acceptance: {
							isAccepted: true,
							acceptanceDate: new Date(),
							comments: ""
						}
					}
				}
			}
		} else {
			setObject = {
				[`actions.${actionIndex}.reschedule`]: {
					rescheduleDate: new Date(),
					reschedulerId: new ObjectId(event.locals.user._id),
					rescheduledCommitmentDate: new Date(rescheduledCommitmentDate),
					assignment: {
						assigneeId: new ObjectId(assigneeId),
						assignmentDate: new Date(),
						comments
					}
				}
			}
		}
		console.log(JSON.stringify(setObject));

		try {
			const result = await capas.updateOne({_id: new ObjectId(capaId)},
				{$set: setObject});
			console.log(result);
		} catch(error) {
			console.error(error);
		}
	}
}
