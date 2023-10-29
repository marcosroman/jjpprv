import capas from '$lib/db/capas';

export const load = async () => {
	// get all capas without a evidence for their response
	const cursor = capas.find(
		{"response": {"$exists": true},
		"response.evidence": {"$exists": false}});
	
	const evidenceToResponsePendingCAPAs = await cursor.toArray();
	await cursor.close();

	return {evidenceToResponsePendingCAPAs:
		JSON.parse(JSON.stringify(evidenceToResponsePendingCAPAs))}
}






	// aggregate so that we can have all the info (who posted the issue, etc)
	/*
	const cursor = capas.aggregate([
		{
			$match: {"response": {"$exists": false}}
		},
		{
			$lookup: {
				from: "users",
				localField: "issue.detectedByUser_id", // Change to your actual reference field name
				foreignField: "_id",
				as: "issue.author"
			}
		},
		{
			$unwind: "$issue.author"
		},
		{
			$lookup: {
				from: "users",
				localField: "response.responderUser_id",
				foreignField: "_id",
				as: "response.author"
			}
		},
		{
			$unwind: "$response.author"
		},
	]);
	*/

