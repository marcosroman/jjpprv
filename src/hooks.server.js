import { start_mongo } from '$lib/db/mongo';
import { SECRET_KEY } from '$env/static/private';
import { handlePageLoad } from '$lib/db/mongo';
import pkg from 'jsonwebtoken';

start_mongo();

export async function handle({ event, resolve }) {
	const { verify } = pkg;

	const userToken = event.cookies.get('userToken');

	if (userToken) {
		event.locals.user = verify(userToken, SECRET_KEY).user;
	}

	const response = await resolve(event);

	return response;
}

