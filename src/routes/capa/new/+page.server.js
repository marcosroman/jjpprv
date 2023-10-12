import sectors from '$lib/db/sectors';
import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';

export const load = async function() {
	const sectorsarray = await sectors.find().toArray();

	// needed to deal with the _id fields (otherwise it's a non-POJO! error!)
	return { sectors: JSON.parse(JSON.stringify(sectorsarray)) }  // it works!
}

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		let docToInsert = {
			documentVersion: 2,
			isNonConformity: data.get('is-non-conformity') === "true" ? true : false,
			creationDate: new Date(),
			issue: {
				detectedInSector_id: new ObjectId(data.get('detected-in-sector')),
				description: data.get('issue-description')
			}
		}

		console.log("docToInsert = ", JSON.stringify(docToInsert))
		const result = await capas.insertOne(docToInsert);
		// TODO: catch error
		console.log(`A document was inserted with the _id: ${result.insertedId}`);
	}
};
