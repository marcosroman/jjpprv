import sectors from '$lib/db/sectors';
import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';

export async function load() {
	const cursor = sectors.find();
	const sectorsArray = await cursor.toArray();
	await cursor.close();

	return { sectors: JSON.parse(JSON.stringify(sectorsArray)) }  // it works!
	// needed to deal with the _id fields (otherwise it's a non-POJO! error!)
}

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		let docToInsert = {
			version: 1,
			issue: {
				creationDate: new Date(),
				issuerId: new ObjectId(event.locals.user._id),
				isNonConformity: data.get('is-non-conformity') === "true" ? true : false,
				detectedDuring: data.get('detected-during'),
				detectedInSectorId: new ObjectId(data.get('detected-in-sector')),
				description: data.get('issue-description')
			}
		}

		//console.log("docToInsert = ", JSON.stringify(docToInsert))
		try {
			const result = await capas.insertOne(docToInsert);
			//console.log(`A document was inserted with the _id: ${result.insertedId}`);
		} catch(error) {
			console.log(error);
			// TODO: push error to the frontend
		}

		throw redirect(303, '/'); // 303 == successful form action
		// TODO: find out why this doesn't work inside the try block....
		// i want to redirect after the insertOne only!
	}
};
