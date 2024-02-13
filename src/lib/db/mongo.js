import { MongoClient } from 'mongodb';
import { MONGODB_URI, DB_NAME } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);

export async function start_mongo() {
	return client.connect().catch((e) => { console.error(e) });
}

export default client.db(DB_NAME);

