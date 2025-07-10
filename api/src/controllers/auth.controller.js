import { registerUser, loginUser, getOrg, renewOrganisation } from '../services/auth.service.js';
import { validateRegister, validateLogin } from '../utils/joi-validtaion.js';
import { AppError, ValidationError, AuthenticationError } from '../utils/AppError.js';
import { CONSTANTS } from "../utils/constants.js"
import { handleDbError } from '../utils/handleDbError.js';

export const register = async (req, res, next) => {
    console.log('Registering user:', req.body);
    try {
        const { error } = validateRegister(req.body);
        console.log(error);
        if (error) {
            console.log(error);
            throw new ValidationError(error.details.map(detail => detail.message).join(', '));
        }
        try {
            const user = await registerUser(req.body);
            res.status(201).json({ message: 'User created 🎉', user });
        } catch (dbError) {
            handleDbError(dbError);
        }

    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            throw new ValidationError(error.details.map(detail => detail.message).join(', '));
        }

        try {
            const user = await loginUser(req.body.email, req.body.password, req.body.fcmToken);
            if (!user) {
                throw new AuthenticationError('Invalid email or password');
            }

            req.session.user = {
                id: user._id,
                role: user.role,
                email: user.email,
                username: user.username,
                organization: user.organization,
            };
            res.json({ message: 'Logged in 🛜', user: req.session.user });
        } catch (dbError) {
            handleDbError(dbError);
        }

    } catch (err) {
        next(err);
    }
};

export const logout = (req, res) => {
    req.session.destroy(() => res.json({ message: 'Logged out 👋' }));
};

export const getOrganization = async (req, res, next) => {
    try {
        console.log("Getting Org details");
        try {
            const org = await getOrg({ _id: req.session.user.organization });
            if (!org) {
                throw new AppError('Organization not found', 404);
            }
            res.status(200).json({ message: 'Org data fetched 🎉', organization: org });
        } catch (dbError) {
            handleDbError(dbError);
        }

    } catch (err) {
        next(err);
    }

};

export const renewOrg = async (req, res, next) => {
    try {
        console.log("Renewing Org details " + req.params.id);
        const { id } = req.params;
        if (!id) {
            throw new ValidationError('Developer Secret ID is required');
        }
        if (id !== CONSTANTS.DEVELOPER_SECRET) {
            throw new ValidationError('Invalid Developer Secret ID');
        }
        try {
            const org = await renewOrganisation();
            if (!org) {
                throw new AppError('Organization not found', 404);
            }
            res.status(200).json({ message: 'Org data renewed 🎉', organization: org });
        } catch (dbError) {
            handleDbError(dbError);
        }

    } catch (err) {
        next(err);
    }
}