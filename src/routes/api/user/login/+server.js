import users from '$lib/db/users';
import { json } from '@sveltejs/kit';
import pkg from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { SECRET_KEY } from '$env/static/private';

const { sign } = pkg;

export async function POST({ request, cookies }) {
	const body = await request.json();
	const userId = body.userId;
	console.log(body);
	console.log('-------')
	console.log(userId);

	//cookies.set('userId', body.userId, {path:'/'});
	const user = await users.findOne({_id: new ObjectId(userId)});
	//console.log("user:", user);
	const userToken = sign({user}, SECRET_KEY);
	cookies.set('userToken', userToken, {path:'/'});

	return json(user,{status: 200});
}

