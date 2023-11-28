import { start_mongo } from '$lib/db/mongo';
import { SECRET_KEY } from '$env/static/private';
import { verify } from 'jsonwebtoken';

start_mongo().then(() => {
	console.log('mongo started!');
}).catch(console.log);

export async function handle({ event, resolve }) {
	console.log('handle running!');

	const userToken = event.cookies.get('userToken');
	if(userToken) {
		event.locals.user = verify(userToken, SECRET_KEY).user;
	}

	const response = await resolve(event);
	return response;
}

