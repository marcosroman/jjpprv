// get the evidence ids for a given capaId and section,
// then retrieve the corresponding evidence data, except for the file binary

import { ObjectId } from 'mongodb';
import capas from '$lib/db/capas';

const getEvidenceCursorWithoutFileBinary = (capaId, evidenceFieldName) => 
	capas.aggregate([
				{ $match: { _id: new ObjectId(capaId) } },
				{ $project: { [evidenceFieldName]: 1 } }, 
				{ $lookup: {
					from: "evidences", 
					localField: evidenceFieldName,
					foreignField: "_id",
					as: evidenceFieldName } },
				{ $project: { [`${evidenceFieldName}.fileBinary`]: 0 } }
			]);

export default getEvidenceCursorWithoutFileBinary ; 
