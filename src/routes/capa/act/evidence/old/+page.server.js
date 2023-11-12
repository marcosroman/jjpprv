import capas from '$lib/db/capas';

export const load = async () => {
	// get all capas having correctiveActions with no evidence
	// (either no such field or empty array)
	const cursor = capas.aggregate([{
    $match: {
			"correctiveActions.response.actions": {
					$elemMatch: {
						$or: [
							{ "evidence": { $exists: false } },
							{ "evidence": { $size: 0 } }
		]}}}
	}]);

	const capasPendingEvidenceToCorrectiveActions = await cursor.toArray();
	await cursor.close();

	//console.log(evidenceToCorrectiveActionsPendingCAPAs);

	return {capasPendingEvidenceToCorrectiveActions:
		JSON.parse(JSON.stringify(capasPendingEvidenceToCorrectiveActions))}
}
