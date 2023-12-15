import capas from '$lib/db/capas';
import { pendingActionsForCAPA } from '$lib/utils/dashboard.js';
import { ObjectId } from 'mongodb';

export async function load() {
	const cursor = await capas.find({"capa.closure.isClosedEffectively": {$exists: false}});
	const capasArray = await cursor.toArray();

	const pendingActions = await capasArray.map((capa) => pendingActionsForCAPA(capa, new Date()))
		.filter((capa) => capa.length>0)
		.reduce((accumulator, currentArray) => {
  		return [...accumulator, ...currentArray];
		}, []);

	return { pendingActions }
}


