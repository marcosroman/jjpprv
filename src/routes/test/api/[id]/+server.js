import evidences from '$lib/db/evidences';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function GET({params}) {
	// saved in capa for now, for testing purposes only
	const evidence =  await evidences.findOne({_id: new ObjectId(params.id)});
	console.log("-----EVIDENCE:");
	console.log(evidence);

	const fileData = `data:${evidence.fileType};base64,${evidence.fileBinary.toString('base64')}`;

	return json({
		capaId: evidence.capa_id,
		description: evidence.description,
		fileData: fileData,
		fileType: evidence.fileType
	});
}

