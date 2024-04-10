import toPOJO from '$lib/utils/toPOJO';
import capas from '$lib/db/capas';

export async function load() {
	try {
		const cursor = capas.find({});
		const capasArray = await cursor.toArray();
		await cursor.close();

		return {capas:
			toPOJO(capasArray)};
	} catch(error) { console.error(error); }
}
