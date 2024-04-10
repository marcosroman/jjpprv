import capas from '$lib/db/capas';

export async function load() {
	try {
		const cursor = capas.find({});
		const capasArray = await cursor.toArray();
		await cursor.close();

		return {capas:
			JSON.parse(JSON.stringify(capasArray))};
	} catch(error) { console.error(error); }
}
