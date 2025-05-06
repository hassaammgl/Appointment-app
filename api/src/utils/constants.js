import dotenv from 'dotenv';

dotenv.config()

export const CONSTANTS = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SESSION_SECRET: process.env.SESSION_SECRET
}