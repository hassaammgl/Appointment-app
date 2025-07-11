import express from 'express';
import { sessionMiddleware } from './config/session.js';
import authRoutes from './routes/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js';
import cors from 'cors'
import { CONSTANTS } from './utils/constants.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';
import morgan from 'morgan';

const app = express();

console.log(CONSTANTS.CLIENT_ORIGIN);


app.use(cors({
    // origin: CONSTANTS.CLIENT_ORIGIN || 'http://localhost:5173',
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(sessionMiddleware);

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

app.get("/api/ping", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello world"
    })
})

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

app.use(notFound);
app.use(errorHandler);



export default app;
