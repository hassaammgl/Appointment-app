import dotenv from 'dotenv';

dotenv.config()

export const CONSTANTS = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SESSION_SECRET: process.env.SESSION_SECRET,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
    NODE_ENV: process.env.NODE_ENV,
    DEVELOPER_SECRET: process.env.DEVELOPER_SECRET,
}