import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const userToken = cookies.get('userToken');
	
	// redirect to / if no userToken (yet)
	if(!userToken) {
		console.log('redirecting because no user token present!');
		throw redirect(302,'/');
	//} else {
	//	event.locals.user = verify(userToken, SECRET_KEY).user;
	}
}

