import { start_mongo } from '$lib/db/mongo';
import { redirect } from '@sveltejs/kit';
import { SECRET_KEY } from '$env/static/private';
import { verify } from 'jsonwebtoken';

start_mongo().then(() => {
	console.log('mongo started!');
}).catch(console.log);

export async function handle({ event, resolve }) {
	console.log('handle running!');
	const userToken = event.cookies.get('userToken');

	// redirect to / if no userToken (yet)
	if(!userToken && (event.url.pathname!='/' && !event.url.pathname.startsWith('/api/user'))) {
		throw redirect(302,'/');
	}

	if (userToken) {
		event.locals.user = verify(userToken, SECRET_KEY).user;
	}

	const response = await resolve(event);
	return response;
}
