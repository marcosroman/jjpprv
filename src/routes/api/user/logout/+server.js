import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	cookies.delete('userToken', {path: '/'});

	return json({status: 200});
}

