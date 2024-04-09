export async function load({ locals }) {
	return {
		user: locals.user,
		isConnected: locals.isConnected
	};
}

