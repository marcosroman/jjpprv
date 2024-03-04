import users from '$lib/db/users';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
const { sign } = jwt;

export async function POST({ request, cookies }) {
	const body = await request.json();
	const userId = body.userId;

	const user = await users.findOne({_id: new ObjectId(userId)});
	const userToken = sign({ user }, SECRET_KEY);
	cookies.set('userToken', userToken, {path:'/', secure: false});
	// TODO: remove secure: false after setting https!

	return json({user}, {status: 200});
}
