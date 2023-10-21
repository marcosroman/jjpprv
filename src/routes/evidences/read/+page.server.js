import evidences from '$lib/db/evidences';

export async function load({ fetch, params }) {
	//const res = await fetch(`/test/apipdf`);
	//const pdf = await res.json();
	const cursor = evidences.find();
	const evidencesArray = JSON.parse(JSON.stringify(await cursor.toArray()));
	//let evidences = JSON.parse(JSON.stringify(evidencesArray))

	return {evidencesArray}
}
