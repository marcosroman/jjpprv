export async function load({ fetch, params }) {
	const res = await fetch(`/test/api/${params.id}`);
	const evidence = await res.json();

	return {evidence}
}
