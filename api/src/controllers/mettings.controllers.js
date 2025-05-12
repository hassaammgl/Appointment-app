import { AppError, ValidationError } from '../utils/AppError.js';
import { validateReqMeeting, validateCancelReq } from "../utils/joi-validtaion.js"
import { getRoles, createMettings, getAllMettings, cancelMettingReq } from "../services/metting.service.js"
import Status from "http-status-codes"

export const createMettingReq = async (req, res, next) => {
    try {
        console.log(req.body);

        const { error } = validateReqMeeting(req.body);
        if (error) {
            console.log(error);
            throw new ValidationError(error.details.map(detail => detail.message).join(', '));
        }

        try {
            const metting = await createMettings(req.body);
            res.status(201).json({ message: 'Appointment created 🎉', metting });
        } catch (dbError) {
            if (dbError.code === 11000) {
                throw new ValidationError('Something happened in database but try to change their values');
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

export const getAllMeetingsReq = async (req, res, next) => {
    try {
        try {
            const allMettings = await getAllMettings();
            console.log(allMettings);

            res.status(200).json({ message: 'All appointments fetched 🎉', allMettings });
        } catch (dbError) {
            if (dbError.code === 11000) {
                throw new ValidationError('Something happened in database but try to change their values');
            } else if (dbError.name === 'MongoError') {
                throw new AppError('Database error occurred', 500);
            }
            throw dbError;
        }
    } catch (err) {
        next(err);
    }
};
export const cancelMeetingReq = async (req, res, next) => {
    try {
        console.log("canceling meeting req");
        console.log(req.params.id);


        const { error } = validateCancelReq({ _id: req.params.id });
        if (error) {
            console.log(error);
            throw new ValidationError(error.details.map(detail => detail.message).join(', '));
        }
        try {
            const respose = await cancelMettingReq(req.params.id)
            if (respose) {

                res.status(Status.OK).json({ message: 'Request Deleted 🎉', success: true });
            }
            else {
                throw new AppError("Error while deleting")
            }
        } catch (dbError) {
            if (dbError.code === 11000) {
                throw new ValidationError('Something happened while canceling in db');
            } else if (dbError.name === 'MongoError') {
                throw new AppError('Database error occurred', 500);
            }
            throw dbError;
        }
    } catch (err) {
        next(err);
    }
};

