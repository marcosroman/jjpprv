// get the evidence ids for a given capaId and section,
// then retrieve the corresponding evidence data, except for the file binary

import { ObjectId } from 'mongodb';
import capas from '$lib/db/capas';

const getEvidenceCursorWithoutFileBinary = (capaId, evidenceFieldName) =>  {
	console.log("evidenceFieldName:");
	console.log(evidenceFieldName);

 return	capas.aggregate([
				{ $match: { _id: new ObjectId(capaId) } },
				//{ $project: { [evidenceFieldName]: 1 } }, 
				{ $lookup: {
					from: "evidences", 
					localField: evidenceFieldName,
					foreignField: "_id",
					as: "evidence"/*evidenceFieldName*/ } },
				{ $project: { /*[`${evidenceFieldName}.fileBinary`]*/"evidence.fileBinary": 0}},
	 //			{ $project: {"evidence": 1} }
			]);
}

export default getEvidenceCursorWithoutFileBinary ; 
