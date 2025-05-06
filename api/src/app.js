import express from 'express';
import { sessionMiddleware } from './config/session.js';
import authRoutes from './routes/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js';


const app = express();

app.use(express.json());
app.use(sessionMiddleware);
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

export default app;
