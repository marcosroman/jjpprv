import capas from '$lib/db/capas';

export async function load() {
	try {
		const cursor = capas.find({});
		const capasAll = await cursor.toArray();
		await cursor.close();

		return {capasAll:
			JSON.parse(JSON.stringify(capasAll))};
	} catch(error) { console.error(error); }
}
