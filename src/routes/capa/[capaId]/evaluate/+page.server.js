import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function load({params}) {
	const capaId = params.capaId;
	const capaIdObject = new ObjectId(capaId);

	const capa = await capas.findOne({_id: capaIdObject});

	return {capa: JSON.parse(JSON.stringify(capa))};
}

export const actions = {
	default: async ({request}) => {
		const data = await request.formData();
		const capaId = data.get('capa-id');
		const commentsByEvaluator = data.get('comments-by-evaluator');

		const capaIdObject = new ObjectId(capaId);

		try {
			const result = await capas.updateOne({_id: capaIdObject},
				{$set: {evaluation: {commentsByEvaluator}}})

			//return json({status: 200});
		} catch(error) {
			console.error(error);
			//return json(error, {status: 400});
		}
	}
}
