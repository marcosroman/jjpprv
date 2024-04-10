import { connect, checkConnection } from '$lib/db/mongo';
import { SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { error, redirect } from '@sveltejs/kit';

function connectToDB() {
	connect()
		.then(() => {
			console.log('mongo connected!');
		})
		.catch((e) => {console.error(e);});
}

connectToDB();

export async function handle({ event, resolve }) {
	const { verify } = jwt;

	const userToken = event.cookies.get('userToken');

	if (userToken) {
		event.locals.user = verify(userToken, SECRET_KEY).user;
	}

	try {
		event.locals.isConnected = undefined;
		await checkConnection();
		event.locals.isConnected = true;
		console.log('still there');
	} catch(error) {
		console.error(error);
		event.locals.isConnected = false;
		connectToDB();
	}

	const response = await resolve(event);

	return response;
}

