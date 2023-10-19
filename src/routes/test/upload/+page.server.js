import capas from '$lib/db/capas';
import { Binary } from 'mongodb';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		//console.log(await formData.get('uploaded-file').arrayBuffer());

		//console.log(event.request.files.file[0]);
		
		const result = await capas.insertOne({
			file: new Binary(await formData.get('uploaded-file').arrayBuffer()),
			//file: binary(await formData.get('uploaded-file')),
			fileType: await formData.get('uploaded-file').type,
		});

		console.log(result);
		//console.log(result.file);
		//console.log(result.fileType);
	}
}
