// get the evidence ids for a given capaId and section,
// then retrieve the corresponding evidence data, except for the file binary
import { ObjectId } from 'mongodb';
import capas from '$lib/db/capas';

const getEvidenceCursorWithoutFileBinary = (capaId, evidenceFieldName) => 
	capas.aggregate([
				{ $match: { _id: new ObjectId(capaId) } },
				{ $lookup: {
					from: "evidences", 
					localField: evidenceFieldName,
					foreignField: "_id",
					as: "evidence" } },
				{ $project: { "evidence.fileBinary": 0}},
			]);

export default getEvidenceCursorWithoutFileBinary ; 
