import { AppError, ValidationError, AuthenticationError } from '../utils/AppError.js';
import { validateReqMeeting } from "../utils/joi-validtaion.js"
import { createMettings } from "../services/metting.service.js"

export const createMettingReq = async (req, res, next) => {
    try {
        const { error } = validateReqMeeting(req.body);
        console.log(error);
        if (error) {
            console.log(error);
            throw new ValidationError(error.details.map(detail => detail.message).join(', '));
        }

        try {
            const metting = await createMettings(req.body);
            res.status(201).json({ message: 'User created 🎉', metting });
        } catch (dbError) {
            if (dbError.code === 11000) {
                throw new ValidationError('User with this email or username already exists');
            } else if (dbError.name === 'MongoError') {
                throw new AppError('Database error occurred', 500);
            }
            throw dbError;
        }
    } catch (err) {
        next(err);
    }
};