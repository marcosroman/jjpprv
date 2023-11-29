import { json } from '@sveltejs/kit';
import { ObjectId, Binary } from 'mongodb';
import evidences from '$lib/db/evidences';

export async function POST(event) {
	try {
		const uploadData = await event.request.json();

		const result = await evidences.insertOne({
			fileName: uploadData.fileName,
			fileBinary: new Binary(Buffer.from(uploadData.fileBuffer, 'base64')),
			fileType: uploadData.fileType,
			description: uploadData.description,
			uploadDate: new Date(),
			uploaderId: new ObjectId(event.locals.user._id)
		})

		return json({insertedId: result.insertedId}, {status:201});
	} catch (error) {
		return json(error, {status: 400});
	}
}

