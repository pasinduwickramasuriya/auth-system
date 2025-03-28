require('dotenv').config({ path: 'D:/next auth/auth-system/.env.local' });
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const { connectToDatabase } = require('./src/lib/db');

async function testConnection() {
    try {
        const { db } = await connectToDatabase();
        console.log('Connected to database:', db.databaseName);
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}

testConnection();