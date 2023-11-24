import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	//cookies.set('usercookie', "usrcookievalue", {path:'/'});
	const body = await request.json();
	console.log(body);
	cookies.set('userId', body.userId, {path:'/'});

	return json({status: 200});
}

