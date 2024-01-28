import { redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import capas from '$lib/db/capas';

export async function load ({ params }) {
	const capaId = params.capaId;

	try {
		const capa = await capas.findOne(
			{ _id: new ObjectId(capaId)});

		return JSON.parse(JSON.stringify({capa}));
	} catch(error) {
		console.error(error);
	}
}

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const capaId = data.get('capa-id');
		const isRequired = data.get('is-ca-required') === 'true' ? true : false;

		let result = null;
		try {
			result = await capas.updateOne(
				{ _id: new ObjectId(capaId) },
				{ $set: {
					correctiveActionsRequirement: {
						requirementDate: new Date(),
						requirerId: new ObjectId(event.locals.user._id),
						isRequired,
					}
				}});
		} catch(error) {
			console.error(error);
		}

		if (result) {
			throw redirect(302, '/');
		}
	}
}
