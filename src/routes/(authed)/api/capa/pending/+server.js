import { json } from '@sveltejs/kit';
import { pendingActionsForUserGroupedByCapa } from '$lib/utils/dashboard';

export async function GET({ locals, url }) {
	const currentDate = url.searchParams.get('currentDate');

	try {
		let pendingActions = await pendingActionsForUserGroupedByCapa(
			locals.user, new Date(currentDate));

		return json({pendingActions}, { status: 200 });
	} catch(error) {
		console.error(error);
		return json({status: 400});
	}
}
