import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect().then(() => {
            console.log('MongoDB connection successful'); // Log success
            return client;
        }).catch((error) => {
            console.error('MongoDB connection failed:', error.message);
            throw error; // Re-throw to handle elsewhere
        });
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect().then(() => {
        console.log('MongoDB connection successful'); // Log success
        return client;
    }).catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        throw error; // Re-throw to handle elsewhere
    });
}

export async function connectToDatabase() {
    const client = await clientPromise;
    const db = client.db('auth-system');
    return { client, db };
}