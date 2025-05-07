import session from 'express-session';
import MongoStore from 'connect-mongo';
import { CONSTANTS } from '../utils/constants';

export const sessionMiddleware = session({
    secret: CONSTANTS.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: CONSTANTS.MONGO_URI }),
    cookie: {
        httpOnly: true,
        secure: CONSTANTS.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
});
