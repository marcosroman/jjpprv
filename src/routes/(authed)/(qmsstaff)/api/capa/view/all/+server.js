import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	//const capaId = params.capaId;

	//const capa = await capas.findOne({_id: new ObjectId(capaId)});
	const cursor = capas.aggregate([
		//{ $match: { _id: new ObjectId(capaId) } },

		{ $lookup: {
			from: "sectors",
			localField: "issue.detectedInSectorId",
			foreignField: "_id",
			as: "issue.detectedInSector"
		}}, { $unwind: { path: "$issue.detectedInSector",
			preserveNullAndEmptyArrays: true } },

		{ $lookup: {
			from: "users",
			localField: "issue.issuerId",
			foreignField: "_id",
			as: "issue.issuer"
		}}, { $unwind: { path: "$issue.issuer",
				preserveNullAndEmptyArrays: true } },

		{ $lookup: {
			from: "users",
			localField: "responseToNonConformity.responderId",
			foreignField: "_id",
			as: "responseToNonConformity.responder"
		}}, { $unwind: { path: "$responseToNonConformity.responder",
				preserveNullAndEmptyArrays: true }},

		{ $lookup: {
			from: "users",
			localField: "correctiveActionsRequirement.requirerId",
			foreignField: "_id",
			as: "correctiveActionsRequirement.requirer"
		}}, { $unwind: { path: "$correctiveActionsRequirement.requirer",
				preserveNullAndEmptyArrays: true } },
	
		{ $unwind: 
			{ path: "$actions",
				preserveNullAndEmptyArrays: true } },

		{ $lookup: {
      from: "users",
      localField: "actions.proposal.proponentId", // Assuming the ID field in the array is named 'id'
      foreignField: "_id",
      as: "actions.proposal.proponent"
		}}, { $unwind: { path: "$actions.proposal.proponent",
				preserveNullAndEmptyArrays: true } },
	
		{ $lookup: {
      from: "users",
      localField: "actions.proposal.assignment.assigneeId",
      foreignField: "_id",
      as: "actions.proposal.assignment.assignee"
			}}, { $unwind: { path: "$actions.proposal.assignment.assignee",
				preserveNullAndEmptyArrays: true }},

		{ $lookup: {
      from: "users",
      localField: "actions.review.reviewerId",
      foreignField: "_id",
      as: "actions.review.reviewer"
		}}, { $unwind: { path: "$actions.review.reviewer",
			preserveNullAndEmptyArrays: true } },

		{ $group: {
				_id: "$_id",
				version: {$first: "$version"},
				issue: {$first: "$issue"},
    		responseToNonConformity: {$first: "$responseToNonConformity"},
    		correctiveActionsRequirement: {$first: "$correctiveActionsRequirement"},
				actions: { $push: "$actions" },
				evaluation: { $first: {$ifNull: ["$evaluation", null]}},
				closure: { $first: {$ifNull: ["$closure", null]}}
			}
		},

		{ $lookup: {
      from: "users",
      localField: "evaluation.assignment.assignerId",
      foreignField: "_id",
      as: "evaluation.assignment.assigner"
		}}, { $unwind: { path: "$evaluation.assignment.assigner",
			preserveNullAndEmptyArrays: true } },
		{ $lookup: {
      from: "users",
      localField: "evaluation.assignment.evaluatorId",
      foreignField: "_id",
      as: "evaluation.assignment.evaluator"
		}}, { $unwind: { path: "$evaluation.assignment.evaluator",
			preserveNullAndEmptyArrays: true } },

		{ $lookup: {
      from: "users",
      localField: "closure.closerId",
      foreignField: "_id",
      as: "closure.closer"
		}}, { $unwind: { path: "$closure.closer",
			preserveNullAndEmptyArrays: true } },

	]);

	const capasArray = await cursor.toArray();
	//const capa = await cursor.toArray();

	return json(capasArray, { status: 200 });
}
