import capas from '$lib/db/capas';
import { Binary } from 'mongodb';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const uploadedFile = formData.get('uploaded-file');

		const result = await capas.insertOne({
			file: new Binary(await uploadedFile.arrayBuffer()),
			fileType: await uploadedFile.type
		});

		console.log(result);
	}
}
