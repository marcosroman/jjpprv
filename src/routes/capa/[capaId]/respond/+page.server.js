import capas from '$lib/db/capas';
import {ObjectId} from 'mongodb'; 
import {redirect} from '@sveltejs/kit';

export const load = async ({params}) => {
	const capa = await capas.findOne({_id: new ObjectId(params.capaId)});

	return {capa: JSON.parse(JSON.stringify(capa))};
} 

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		try {
			await capas.updateOne(
				{ _id: new ObjectId(formData.get('id')) },
				{ "$set": {
					response: {
						responseDate: new Date(),
						immediateActions: formData.get('immediate-actions'),
						consequences: formData.get('consequences')
					}
				}});
		} catch (error) {
			console.log(error);
		}

		throw redirect(303, "/");
	}
}
