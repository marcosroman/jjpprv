import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';

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
	default: async ({request}) => {
		const data = await request.formData();
		const capaId = data.get('capa-id');
		const isRequired = data.get('is-ca-required') === 'true' ? true : false;

		try {
			const result = await capas.updateOne(
				{ _id: new ObjectId(capaId) },
				{ $set: {
					correctiveActions: {
						isRequired,
						requirementDate: new Date()
					}
				}});

			//console.log(result);
		} catch(error) {
			console.error(error);
		}
	}
}
