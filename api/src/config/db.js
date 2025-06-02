import mongoose from 'mongoose';
import { CONSTANTS } from '../utils/constants.js';

export const connectDB = async () => {
    try {
        const connectionOptions = {
            serverSelectionTimeoutMS: 5000,
            retryWrites: true,
            w: 'majority'
        };

        console.log('⏳ Connecting to MongoDB...');
        await mongoose.connect(CONSTANTS.MONGO_URI, connectionOptions);

        mongoose.connection.on('connected', () => {
            console.log('✅ MongoDB connected');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

    } catch (err) {
        console.error('❌ Initial MongoDB connection failed:', err.message);
        process.exit(1);
    }
};