import evidences from '$lib/db/evidences';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function GET({params}) {
	try {
		const evidence =  await evidences.findOne({_id: new ObjectId(params.evidenceId)});

		const fileData = `data:${evidence.fileType};base64,${evidence.fileBinary.toString('base64')}`;

		return json({
			fileName: evidence?.fileName,
			fileData: fileData,
			fileType: evidence?.fileType,
			description: evidence?.description
		}, {status: 200});
	} catch (error) {
		return json(error, {status: 400});
	}
}
