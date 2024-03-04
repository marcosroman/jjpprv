import { get } from 'svelte/store';
import { pendingActionsForUserGroupedByCapa } from '$lib/utils/dashboard';
import { selectedDate } from '$lib/utils/stores';

export async function load({ locals }) {
	if (locals.user) {
		try {
			const pendingActionsPerCapa = await pendingActionsForUserGroupedByCapa(
				locals.user, new Date(get(selectedDate)));

			return { 
				pendingActionsPerCapa,
				user: locals.user
			}
		} catch(error) {
			console.error(error);
			return { error }
		}
	} else {
		return { pendingActionsPerCapa: null };
	}
}
