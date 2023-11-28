import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const capaId = params.capaId;

	//const capa = await capas.findOne({_id: new ObjectId(capaId)});
	const cursor = capas.aggregate([
		{
			$match: { _id: new ObjectId(capaId) }
		},
		{
			$lookup: {
				from: "sectors",
				localField: "issue.detectedInSectorId",
				foreignField: "_id",
				as: "issue.detectedInSector"
			},
		},
		{
			$unwind: "$issue.detectedInSector"
		},
		{
			$lookup: {
				from: "users",
				localField: "issue.issuerId",
				foreignField: "_id",
				as: "issue.issuer"
			},
		},
		{
			$unwind: "$issue.issuer"
		}
	]);
	const capa = await cursor.next();

	return json(capa, {status:200});
}
