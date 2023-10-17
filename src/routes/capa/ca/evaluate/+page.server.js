// check capas with response but with no evaluation...
// how?
import capas from '$lib/db/capas';

export const load = async () => {
	const cursor = capas.find({
		correctiveActions: {
			$exists: true,
			$not: {
				$elemMatch: {
					evaluation: { $exists: true }
				}
			}
		}});

	const capas_without_evaluation = await cursor.toArray();

	cursor.close();

	return {capas_without_evaluation:
		JSON.parse(JSON.stringify(capas_without_evaluation))};
}
