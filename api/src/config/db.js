import mongoose from 'mongoose';
import { CONSTANTS } from '../utils/constants';

export const connectDB = async () => {
    try {
        await mongoose.connect(CONSTANTS.MONGO_URI);
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error', err);
        process.exit(1);
    }
};
