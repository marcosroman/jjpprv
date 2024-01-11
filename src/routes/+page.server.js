import { get } from 'svelte/store';
import capas from '$lib/db/capas';
import { pendingActionsForUser } from '$lib/utils/dashboard';
import { selectedDate } from '$lib/utils/stores';

export async function load({ locals }) {
	if (locals.user) {
		try {
			const pendingActions = await pendingActionsForUser(
				locals.user, new Date(get(selectedDate)));
			return { pendingActions, user: locals.user }
		} catch(error) {
			console.error(error);
			return {error}
		}
	} else {
		return { pendingActions: null };
	}
}
