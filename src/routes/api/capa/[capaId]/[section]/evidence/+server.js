import { json } from '@sveltejs/kit';
import getEvidenceCursorWithoutFileBinary
	from '../getEvidenceCursorWithoutFileBinary.js';

export async function GET({params}) {
	const capaId = params.capaId;
	const section = params.section;
	const evidenceFieldName = `${section}.evidence`;
	const cursor = getEvidenceCursorWithoutFileBinary(capaId, evidenceFieldName);
	
	try {
		const evidenceArray = (await cursor.next());

		const evidence = evidenceArray?.evidence;//.correctiveActions)[0]?.evidence;//((await cursor.next())
		console.log(evidence);
			//?.[section.replace('.','?.')]?.evidence;
		//console.log('XXXXXXXXXXXXXXXXXXXXXXXX')
		//console.log(evidenceArray);
		return json({evidence}, {status: 200});
		//return json({evidenceArray},{status: 200});
	} catch(error) {
		return json({error},{status: 400});
	}
}
