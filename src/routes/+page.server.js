import capas from '$lib/db/capas';
import { pendingActionsForCAPA } from '$lib/utils/dashboard.js';

export async function load({ locals }) {
	const cursor = capas.find();//{"capa.closure.isClosedEffectively": {$exists: false}});

	if(locals.user) {
		console.log('locals.user=',locals.user);
		try {
			const capasArray = await cursor.toArray();

			// join all the arrays into one (concat arrays)
			let pendingActions = capasArray
				.map((capa) => pendingActionsForCAPA(capa, new Date()));
			pendingActions = (await Promise.all(pendingActions))
				.filter((capa) => capa.length>0)
				.reduce((a, c) => [...a, ...c], [])
				.filter((action) => action.assigneeId === locals.user._id);
			
			return { pendingActions }
		} catch(error) {
			console.error(error);
			return {}
		}
	} else {
		return { pendingActions: null };
	}
}
