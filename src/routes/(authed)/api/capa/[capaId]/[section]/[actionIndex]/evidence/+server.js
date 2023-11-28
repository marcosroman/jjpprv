import getEvidenceCursorWithoutFileBinary
	from '../../getEvidenceCursorWithoutFileBinary.js';
import { json } from '@sveltejs/kit';

export async function GET({params}) {
	const capaId = params.capaId;
	const actionIndex = params.actionIndex;

	const evidenceFieldName = `actions.${actionIndex}.evidence`;
	const cursor = getEvidenceCursorWithoutFileBinary(capaId, evidenceFieldName);

	try {
		const result = await cursor.next();
		const evidence = result?.evidence;
		cursor.close();

		return json({evidence},{status: 200});
	} catch(error) {
		return json({error},{status:400});
	}
}
