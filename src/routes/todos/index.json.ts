import { Firestore } from '@google-cloud/firestore';
import type { RequestHandler } from '@sveltejs/kit';
import path from 'path';

const dev = process.env.NODE_ENV === 'development';

let db;

try {
	if (dev) {
		db = new Firestore({
			projectId: process.env.PROJECT_ID,
			keyFilename: path.join(path.resolve(), 'serviceAccount.json'),
			timestampsInSnapshots: true
		});
	} else {
		const config = {
			credentials: {
				private_key: process.env.PRIVATE_KEY,
				client_email: process.env.CLIENT_EMAIL
			},
			projectId: process.env.PROJECT_ID,
			timestampsInSnapshots: true
		};

		db = new Firestore(config);
	}
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
