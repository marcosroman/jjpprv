import { MongoClient } from 'mongodb';
import { MONGODB_URI, DB_NAME } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);

export async function connect() {
	await client.connect();
}

export async function checkConnection() {
	try {
		await client.db().command({ ping: 1 });
		console.log('Still connected to the database');
	} catch (error) {
		console.error('Connection lost:', error);
		throw error; // Propagate the error
	}
}

export async function disconnect() {
	await client.close();
}

export default client.db(DB_NAME);

