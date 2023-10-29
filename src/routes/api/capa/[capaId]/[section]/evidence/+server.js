import { json } from '@sveltejs/kit';
import getEvidenceCursorWithoutFileBinary
	from '../getEvidenceCursorWithoutFileBinary.js';

export async function GET({params}) {
	const capaId = params.capaId;
	const section = params.section;
	const evidenceFieldName = `${section}.evidence`;

	const cursor = getEvidenceCursorWithoutFileBinary(capaId, evidenceFieldName);
	try {
		const result = (await cursor.next());
		const evidence = result?.evidence;
		cursor.close();

		return json({evidence}, {status: 200});
	} catch(error) {
		return json({error},{status: 400});
	}
}
