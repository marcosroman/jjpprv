export async function load({ fetch, params }) {
	const res = await fetch(`/test/apipdf`);
	const pdf = await res.json();

	return {pdf}
}
