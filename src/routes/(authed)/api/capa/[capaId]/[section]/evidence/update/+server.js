import { json } from '@sveltejs/kit';
import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';

export async function PUT({ request, params }) {
	const capaId = params.capaId;
	const requestBody = await request.json();
	const documentSection = await requestBody.documentSection;
	const newEvidenceId = await requestBody.newEvidenceId;
	const newEvidenceObjectId = new ObjectId(await newEvidenceId);

	// check first if document and documentSection exists...
	// and if evidence array exists...
	// if it doesnt, create it and add the new one
	// if it does, add the element only if not already present
	let sectionData = (await capas.findOne(
		{ _id: new ObjectId(capaId) }, { [documentSection]: 1 }
	))

	if (documentSection.includes('actions')) {
		const actionIndex = documentSection.split('.')[1];
		sectionData = sectionData.actions[actionIndex];
	} else {
		sectionData = sectionData?.[documentSection];
	}

	try {
		const evidenceArray = (await sectionData)?.evidence;

		if ( !(evidenceArray
					 && evidenceArray.map(o => o.toHexString())
													 .includes(newEvidenceId)) ) {
			try {
				// put into evidence array using push
				const pushResponse = await capas.updateOne(
					{ _id: new ObjectId(capaId) },
					{ $push: { [`${documentSection}.evidence`]: newEvidenceObjectId }}
				);
				return json({pushResponse}, {status: 201}); // created
			} catch (error) {
				console.error(error);
				return json(error, {status: 400});
			}
		} else {
			return json({}, {status: 400});
		}
	} catch(error) {
		return json(error, {status: 400});
	}
}
