export async function load({ fetch, params }) {
	const res = await fetch(`/test/api`);
	// TODO: add error handling
	//
	const item = await res.json();

	return { item };
}
