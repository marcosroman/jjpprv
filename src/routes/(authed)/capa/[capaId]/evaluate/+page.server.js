import { ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';
import capas from '$lib/db/capas';

export async function load({ params }) {
	const capaId = params.capaId;

	const capa = await capas.findOne({_id: new ObjectId(capaId)});

	return {capaId, isNC: capa.issue.isNonConformity};
}

export const actions = {
	default: async ({request}) => {
		const data = await request.formData();
		const capaId = data.get('capa-id');
		const evaluationDate = new Date();
		const isEffective = data.get('is-effective') === "true" ? true : false;
		const comments = data.get('comments');

		let result;
		try {
			result = await capas.updateOne({_id: new ObjectId(capaId)}, {
				$set: {
					"evaluation.evaluationDate": evaluationDate,
					"evaluation.comments": comments,
					"evaluation.isEffective": isEffective
				}
			});
		} catch(error) {
			console.error(error);
		}

		if (result) {
			throw redirect(302, '/');
		}
	}
}
