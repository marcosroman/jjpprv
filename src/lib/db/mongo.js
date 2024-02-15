import { MongoClient } from 'mongodb';
import { MONGODB_URI, DB_NAME } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);

export async function start_mongo() {
	try {
		console.log('mongo starting...');
		return client.connect().then(() => {console.log('mongo started.')});
	} catch(error) {
		console.error(error);
	}
}

export default client.db(DB_NAME);

