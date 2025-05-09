import { AppError, ValidationError } from '../utils/AppError.js';
import { validateReqMeeting } from "../utils/joi-validtaion.js"
import { getRoles, createMettings } from "../services/metting.service.js"

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

export const getAllRoles = async (req, res, next) => {
    try {
        try {
            const roles = await getRoles()
            res.status(200).json({
                message: "Users getting successfully 🎉",
                roles
            })
        } catch (dbError) {
            if (dbError.code === 11000) {
                throw new ValidationError('Something happened in database');
            } else if (dbError.name === 'MongoError') {
                throw new AppError('Database error occurred', 500);
            }
            throw dbError;
        }
    } catch (err) {
        next(err);
    }
}