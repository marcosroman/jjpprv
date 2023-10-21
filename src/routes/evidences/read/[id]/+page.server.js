export async function load({ fetch, params }) {
	const res = await fetch(`/api/evidences/${params.id}`);
	const evidence = await res.json();

	return {evidence}
}
