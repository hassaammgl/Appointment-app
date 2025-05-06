import express from 'express';
import { sessionMiddleware } from './config/session.js';
import authRoutes from './routes/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js';
import cors from 'cors'
import { CONSTANTS } from './utils/constants.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';

const app = express();

app.use(cors({
    origin: CONSTANTS.CLIENT_ORIGIN || 'http://localhost:5173', 
    credentials: true
}));
app.use(express.json());
app.use(sessionMiddleware);

// Routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

app.use(notFound); 
app.use(errorHandler);

export default app;
