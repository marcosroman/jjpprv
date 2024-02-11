import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';

export async function load({params}) {
	//<!-- show capas that were closed, not effective and that dont yet have an additional capa -->
	// what would be the options? capas that are not closed, first of all... maybe i can exclude those that are already linked to something else... but 
	const cursor = capas.find({"closure.isClosedEffectively": {$exists: false}});
	const capaOptionsToLink = await cursor.toArray();

	return {
		...params,
		capaOptionsToLink: JSON.parse(JSON.stringify(capaOptionsToLink))
	};
}

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const capaId = data.get('capa-id');
		const followUpCapaId = data.get('followup-capa-id');

		let result;
		try {
			result = await capas.updateOne({_id: new ObjectId(capaId)}, {
				$set: {
					"closure.additionalCAPA": new ObjectId(followUpCapaId)
				}
			});

			console.log(result);
		} catch(error) {
			console.error(error);
		}

		if (result) {
			throw redirect(302, '/');
		}
	}
}
