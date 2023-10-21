import evidences from '$lib/db/evidences';
import { Binary, ObjectId } from 'mongodb';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const uploadedFile = formData.get('uploaded-file');

		try {
			await evidences.insertOne({
				capa_id: formData.get('capa-id'), //new ObjectId()
				fileBinary: new Binary(await uploadedFile.arrayBuffer()),
				fileType: await uploadedFile.type,
				description: formData.get('description')
			});
		} catch(error) {
			console.log(error);
		}
	}
}
