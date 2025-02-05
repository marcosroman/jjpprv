import capas from '$lib/db/capas';
import {ObjectId} from 'mongodb'; 
//import {redirect} from '@sveltejs/kit';

export const load = async ({params}) => {
	const capa = await capas.findOne({_id: new ObjectId(params.id)});

	return {capa: JSON.parse(JSON.stringify(capa))};
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
				const rescheduleDateFieldName = "correctiveActions."+correctiveActionIndex+".evaluation.rescheduleDate";
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
				const isAccomplishedFieldName = `correctiveActions.${correctiveActionIndex}.evaluation.isAccomplished`;
				const commentsFieldName = `correctiveActions.${correctiveActionIndex}.evaluation.comments`;
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
