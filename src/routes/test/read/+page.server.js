export async function load({ fetch, params }) {
	const res = await fetch(`/test/api`);
	const item = await res.json();

	return { item };
}
