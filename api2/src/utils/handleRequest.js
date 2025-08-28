import { AppError, ValidationError } from './AppError.js';

export const handleRequest = async ({
    req,
    res,
    next,
    validator = null,
    service,
    serviceArgs = [],
    successStatus = 200,
    successMessage = 'Success',
}) => {
    try {
        if (validator) {
            const { error } = validator(req);
            if (error) {
                throw new ValidationError(error.details.map(detail => detail.message).join(', '));
            }
        }

        try {
            const result = await service(...serviceArgs);
            if (!result) throw new AppError('Operation failed');

            res.status(successStatus).json({
                message: successMessage,
                ...(typeof result === 'object' ? result : { success: true }),
            });
        } catch (dbError) {
            if (dbError.code === 11000) {
                throw new ValidationError('Duplicate key error in DB 🚨');
            } else if (dbError.name === 'MongoError') {
                throw new AppError('Database error occurred', 500);
            }
            throw dbError;
        }
    } catch (err) {
        next(err);
    }
};
