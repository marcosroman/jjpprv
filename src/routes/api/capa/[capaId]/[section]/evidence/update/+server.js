import { json } from '@sveltejs/kit';
import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';

export async function PUT({request,params}) {
	const capaId = params.capaId;
	const requestBody = await request.json();
	const section = requestBody.section;
	const newEvidenceId = requestBody.newEvidenceId;
	const newEvidenceObjectId = new ObjectId(newEvidenceId);

	// check first if document and section exists...
	// and if evidence array exists...
	// if it doesnt, create it and add the new one
	// if it does, add the element only if its not there already
	const sectionData = (await capas.findOne(
		{ _id: new ObjectId(capaId) }, { [section]:1 }
	))?.[section];

	console.log('sectionData = ', sectionData)
	const evidenceArray = (await sectionData)?.evidence;
	console.log('evidenceArray is', evidenceArray);
	let pushResponse;
	//if (!evidenceArray || !(newEvidenceId in evidenceArray)) {
	if ( !(evidenceArray
			   && evidenceArray.map(o => o.toHexString())
			                   .includes(newEvidenceId)) ) {
		// put into evidence array using push
		pushResponse = await capas.updateOne(
			{ _id: new ObjectId(capaId) },
			{ $push: { [`${section}.evidence`]: newEvidenceObjectId } }
		);
	}

	return json({pushResponse}, {status: 200});
}
