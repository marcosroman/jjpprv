import { SECRET_KEY } from '$env/static/private';
import { verify } from 'jsonwebtoken';

export async function load({ locals }) {
	return { user: locals.user };
}

