// utils/handleDbError.js
export function handleDbError(error) {
    if (error.code === 11000) {
        throw new ValidationError('Duplicate key error');
    }
    if (error.name === 'MongoError') {
        throw new AppError('MongoDB error occurred', 500);
    }
    throw error;
}
