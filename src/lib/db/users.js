import db from '$lib/db/mongo';

const users = db.collection('users');

export default users;

