import getEvidenceCursorWithoutFileBinary
	from '../../getEvidenceCursorWithoutFileBinary.js';
import { json } from '@sveltejs/kit';

export async function GET({params}) {
	const capaId = params.capaId;
	const correctiveActionIndex = params.correctiveActionIndex;
	//const section = params.section;
	const evidenceFieldName = `correctiveActions.${correctiveActionIndex}.evidence`;

	//if (section === "ca") {
	// get the evidence ids for a given capaId and correctiveActionIndex,
	// then retrieve the corresponding evidence data, except for the file binary
	const cursor = getEvidenceCursorWithoutFileBinary(capaId, evidenceFieldName);


	try {
		const result = await cursor.next();
		const evidence = result?.evidence;//.correctiveActions)[0]?.evidence;//((await cursor.next())
		console.log(evidence);
			//?.correctiveActions)[correctiveActionIndex]?.evidence;

		return json({evidence}, {status: 200});
	//}}
	} catch(error) {
		console.error(error);
		return json({error},{status:400});
	}
}
