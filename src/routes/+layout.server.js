import { SECRET_KEY } from '$env/static/private';
import { verify } from 'jsonwebtoken';

export async function load({ locals }) {
	//const userToken = cookies.get('userToken');
	//const user = userToken ? verify(userToken, SECRET_KEY)?.user : null;

	//console.log("(layout.server load) userToken:", userToken);
	console.log("(layout.server load) user:", locals.user);

	return { user: locals.user };
}

