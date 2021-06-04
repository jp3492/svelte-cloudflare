import { Firestore } from '@google-cloud/firestore';
import type { RequestHandler } from '@sveltejs/kit';
import path from 'path';

const dev = process.env.NODE_ENV === 'development';

let db;
try {
	db = new Firestore({
		projectId: process.env.PROJECT_ID,
		keyFilename: dev
			? path.join(path.resolve(), 'serviceAccount.json')
			: JSON.parse(process.env.SERVICE_ACCOUNT),
		timestampsInSnapshots: true
	});
} catch (error) {
	console.log('DB error', error);
}

const angebote = db.collection('angebote');

export const get: RequestHandler = async () => {
	const snapshots = await angebote.get();
	const data = [];
	snapshots.forEach((s) => data.push({ ...s.data(), id: s.id }));
	return {
		body: data
	};
};
