import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user.isQMSStaff) {
		console.log('you\'re not qmsstaff!');
		throw error(401,{message: "Acceso no autorizado. Debes ser personal del SGC para acceder a esta ruta."});
	}
}

