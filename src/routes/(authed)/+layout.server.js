import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const userToken = cookies.get('userToken');
	
	// redirect to '/' if no userToken
	if(!userToken) {
		console.log('redirecting because no user token present!');
		throw redirect(302,'/');
	}
}

