import { MongoClient } from 'mongodb';
import { MONGODB_URI, DB_NAME } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);

export async function start_mongo() {
	console.log('starting mongo...');
	return client.connect();
}

export default client.db(DB_NAME);
