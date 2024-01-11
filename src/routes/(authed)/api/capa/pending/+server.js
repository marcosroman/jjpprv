import { json } from '@sveltejs/kit';
import { pendingActionsForUser } from '$lib/utils/dashboard';

export async function GET({ params, locals }) {
	try {
		let pendingActions = await pendingActionsForUser(locals.user, new Date(params.currentDate));

		return json({pendingActions}, { status: 200 });
	} catch(error) {
		console.error(error);
		return json({status: 400});
	}
}
