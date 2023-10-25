import { json } from '@sveltejs/kit';
import { Binary } from 'mongodb';
import evidences from '$lib/db/evidences';

export async function POST({request}) {
	const uploadData = await request.json();
	//try {
		const result = await evidences.insertOne({
			fileName: uploadData.fileName,
			fileBinary: new Binary(Buffer.from(uploadData.fileBuffer, 'base64')),
			fileType: uploadData.fileType,
			description: uploadData.description
		})

		return json({insertedId: result.insertedId}, {status:201});
	//} catch(error) {
	//	console.log(error);
}

