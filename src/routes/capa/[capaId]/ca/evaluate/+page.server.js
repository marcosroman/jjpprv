import capas from '$lib/db/capas';
import {ObjectId} from 'mongodb'; 

export const load = async ({params}) => {
	const capaId = params.capaId;

	try {
		const capa = await capas.findOne({_id: new ObjectId(capaId)});

		return {capa: JSON.parse(JSON.stringify(capa))};
	} catch (error) {
		console.error(error);
	}
} 

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		console.log(formData);
		const _id = formData.get('capa-id');
		const correctiveActionIndex = formData.get('ca-index');
		const isReschedule = formData.get('is-reschedule') === 'true' ? true : false;

		console.log({_id,correctiveActionIndex,isReschedule});
		if (isReschedule) {
			const rescheduleDate = new Date(formData.get('reschedule-date'));
			try {
				const rescheduleDateFieldName = `correctiveActions.response.actions.${correctiveActionIndex}.evaluation.rescheduleDate`;
				await capas.updateOne(
					{ _id: new ObjectId(_id) },
					{ "$set": {
						[rescheduleDateFieldName]: rescheduleDate} });
				console.log({rescheduleDate});
				console.log("saved!");
			} catch(error) {
				console.log(error);
			}
		} else {
			const comments = formData.get('comments');
			const isAccomplished = Boolean(formData.get('is-accomplished'));

			try {
				const isAccomplishedFieldName = `correctiveActions.response.actions.${correctiveActionIndex}.evaluation.isAccomplished`;
				const commentsFieldName = `correctiveActions.response.actions.${correctiveActionIndex}.evaluation.comments`;
				await capas.updateOne(
					{ _id: new ObjectId(_id) },
					{ "$set": {
						[isAccomplishedFieldName]: isAccomplished,
						[commentsFieldName]: comments,
					}});
			} catch(error) {
				console.log(error);
			}
			console.log({comments,isAccomplished});
			console.log("saved!");
		}
	}
}
