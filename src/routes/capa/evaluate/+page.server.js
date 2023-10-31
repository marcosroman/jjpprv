import capas from '$lib/db/capas';

export async function load() {
	const cursor = capas.find({
		evaluation: {
			$exists: false}});

	const capasWithoutEvaluation = await cursor.toArray();
	cursor.close();

	return {capas: JSON.parse(JSON.stringify(capasWithoutEvaluation))};
}

	/*
	
	// enviar solo las capas que no tienen field de evaluation todavia
	// cargar aca la info de la accion correctiva para mostrar...
}

export const actions {
	default: async ({request}) => {
		const data = await request.formData();

	}
}
//actions...
// guardar en el documento la evaluacion



(no era aca esto... aca solo traigo las capas que no tienen evaluacion)
*/
