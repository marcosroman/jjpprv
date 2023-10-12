import actions from '$lib/db/actions';

export const load = async function() {
	const dataarray = await actions.find().toArray();
	console.log(dataarray);

	//	no envia un POJO (plain old javascript object... sino un array... y que hace structuredClone???)
	//	salio de aca -> https://github.com/pocketbase/pocketbase/discussions/1025
	return { dataarray: structuredClone(dataarray) } //dataarray.map((da) => da.export()) };
}

