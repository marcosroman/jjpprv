import { ObjectId } from 'mongodb';
import { json, redirect } from '@sveltejs/kit';

import capas from '$lib/db/capas';

export const load = async ({params}) => {
	// won't add anything related to rescheduling here...
	return {...params};
}

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const capaId = data.get('capa-id');
		const actionIndex = data.get('action-index');

		const reviewObject = {
			reviewDate: new Date(),
			reviewerId: new ObjectId(event.locals.user._id),
			isAccomplished: data.get('is-accomplished') === "true" ? true : false,
			comments: data.get('comments')
		}

		let result = null;
		try {
			result = capas.updateOne(
				{_id: new ObjectId(capaId)},
				{$set: {
					[`actions.${actionIndex}.review`]: reviewObject
				}}
			);
		} catch(error) {
			console.error(error);
		}

		if (result) {
			throw redirect(302, '/');
		}
	}
}
