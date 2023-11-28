import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	//cookies.set('usercookie', "usrcookievalue", {path:'/'});
	//const body = await request.json();
	//console.log(body);
	cookies.delete('userToken', {path: '/'});

	return json({status: 200});
}

