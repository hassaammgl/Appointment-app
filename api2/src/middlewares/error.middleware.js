import { NotFoundError } from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError' && err.errors) {
        err.statusCode = 400;
        err.message = Object.values(err.errors)
            .map(error => error.message)
            .join(', ');
    }

    // Handle Mongoose duplicate key errors
    if (err.code === 11000) {
        err.statusCode = 400;
        err.message = `Duplicate value for: ${Object.keys(err.keyValue).join(
            ', '
        )}. Please choose another value.`;
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        err.statusCode = 401;
        err.message = 'Invalid token. Please log in again.';
    }

    // Development error response (with stack trace)
    if (process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err
        });
    }

    // Production error response (no error details)
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};


export const notFound = (req, res, next) => {
    const error = new NotFoundError(`Route ${req.originalUrl} not found`);
    next(error);
};