import users from '$lib/db/users';
import { json } from '@sveltejs/kit';

export async function GET() {
	try {
		const cursor = users.find();
		const userArray = await cursor.toArray();

		return json(userArray, {status: 200});
	} catch(error) {
		return json(error, {status: 400});
	}
}
