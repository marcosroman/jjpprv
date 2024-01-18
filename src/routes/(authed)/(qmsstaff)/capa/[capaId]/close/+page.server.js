import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function load({params}) {
	const capaId = params.capaId;
	const capa = await capas.findOne({_id: new ObjectId(capaId)});

	return {capa: JSON.parse(JSON.stringify(capa))};
}

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const capaId = data.get('capa-id');

		let closureObject = {
			closerId: new ObjectId(event.locals.user._id),
			closureDate: new Date(),
			isRisksUpdateRequired: data.get('is-risks-update-required') === "true" ? true : false,
			isChangingQMSRequired: data.get('is-changing-qms-required') === "true" ? true : false,
			comments: data.get('comments'),
			isClosedEffectively: data.get('is-closed-effectively')  === "true" ? true: false
		};

		try {
			await capas.updateOne({_id: new ObjectId(capaId)},
				{$set: {closure: closureObject}});
		} catch(error) {
			console.error(error);
		}
	}
}
