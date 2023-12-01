import capas from '$lib/db/capas';
import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const capaId = params.capaId;

	//const capa = await capas.findOne({_id: new ObjectId(capaId)});
	const cursor = capas.aggregate([
		{ $match: { _id: new ObjectId(capaId) } },

		{ $lookup: {
			from: "sectors",
			localField: "issue.detectedInSectorId",
			foreignField: "_id",
			as: "issue.detectedInSector"
		}}, { $unwind: "$issue.detectedInSector" },

		{ $lookup: {
			from: "users",
			localField: "issue.issuerId",
			foreignField: "_id",
			as: "issue.issuer"
		}}, { $unwind: "$issue.issuer" },

		{ $lookup: {
			from: "users",
			localField: "responseToNonConformity.responderId",
			foreignField: "_id",
			as: "responseToNonConformity.responder"
		}}, { $unwind: "$responseToNonConformity.responder" },

		{ $lookup: {
			from: "users",
			localField: "correctiveActionsRequirement.requirerId",
			foreignField: "_id",
			as: "correctiveActionsRequirement.requirer"
		}}, { $unwind: "$correctiveActionsRequirement.requirer" },

		{ $unwind: "$actions" },
		
		{ $lookup: {
      from: "users",
      localField: "actions.proposal.proponentId", // Assuming the ID field in the array is named 'id'
      foreignField: "_id",
      as: "actions.proposal.proponent"
		}}, { $unwind: "$actions.proposal.proponent" },

		/*
		{ $addFields: {
			"actions.proposal.assignment.assigneeId": {
				$ifNull: ["$actions.proposal.assignment.assigneeId", null]
			}
		}},
		*/
		
		{ $lookup: {
      from: "users",
      localField: "actions.proposal.assignment.assigneeId",
      foreignField: "_id",
      as: "actions.proposal.assignment.assignee"
      //as: "actionAssignee"
		}},
		{ $unwind: { path: "$actions.proposal.assignment.assignee", preserveNullAndEmptyArrays: true } },

		{ $lookup: {
      from: "users",
      localField: "actions.proposal.review.reviewerId",
      foreignField: "_id",
      as: "actions.proposal.review.reviewer"
      //as: "actionAssignee"
		}},
		{ $unwind: { path: "$actions.proposal.review.reviewer", preserveNullAndEmptyArrays: true } },

		//{ $unwind: { path: "$actionAssignee", preserveNullAndEmptyArrays: true } },
		//{ $unwind: "$actionAssignee" },
		//}},/* { $unwind: "$actions.proposal.assignment.assignee" },
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
      //as: "actionAssignee"
		}},
		{ $unwind: { path: "$evaluation.assignment.assigner", preserveNullAndEmptyArrays: true } },
		{ $lookup: {
      from: "users",
      localField: "evaluation.assignment.evaluatorId",
      foreignField: "_id",
      as: "evaluation.assignment.evaluator"
      //as: "actionAssignee"
		}},
		{ $unwind: { path: "$evaluation.assignment.evaluator", preserveNullAndEmptyArrays: true } },

		{ $lookup: {
      from: "users",
      localField: "closure.closerId",
      foreignField: "_id",
      as: "closure.closer"
      //as: "actionAssignee"
		}},
		{ $unwind: { path: "$closure.closer", preserveNullAndEmptyArrays: true } },

	]);

	const capa = await cursor.next();
	//const capa = await cursor.toArray();

	return json(capa, { status: 200 });
}
