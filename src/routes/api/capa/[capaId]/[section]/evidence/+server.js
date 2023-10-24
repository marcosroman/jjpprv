import { json } from '@sveltejs/kit';
import getEvidenceCursorWithoutFileBinary
	from '../getEvidenceCursorWithoutFileBinary.js';

export async function GET({params}) {
	const capaId = params.capaId;
	const section = params.section;
	const evidenceFieldName = `${section}.evidence`;

	if (section === ("issue" || "response")) {
		const cursor = getEvidenceCursorWithoutFileBinary(capaId, evidenceFieldName);
		const evidence = (await cursor.next())
			?.[section]?.evidence;

		return json({evidence});
	}
}
