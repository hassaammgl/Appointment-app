import session from 'express-session';
import MongoStore from 'connect-mongo';
import { CONSTANTS } from '../utils/constants.js';

export const sessionMiddleware = session({
    secret: CONSTANTS.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: CONSTANTS.MONGO_URI,
        collectionName: 'sessions',
        ttl: 60 * 60 * 24 * 7
    }),
    cookie: {
        httpOnly: true,
        secure: CONSTANTS.NODE_ENV === 'production',
        sameSite: CONSTANTS.NODE_ENV === 'production' ? 'none' : 'lax', // 👈 important if frontend is on different domain
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
});
