import { start_mongo } from '$lib/db/mongo';

start_mongo().then(() => {
	console.log('mongo started!');
}).catch(console.log);

