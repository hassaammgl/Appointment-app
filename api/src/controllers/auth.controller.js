import { registerUser, loginUser } from '../services/auth.service.js';
import { validateRegister, validateLogin } from '../utils/joi-validtaion.js';
import { AppError, ValidationError, AuthenticationError } from '../utils/AppError.js';

export const register = async (req, res, next) => {
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

export const login = async (req, res, next) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            throw new ValidationError(error.details.map(detail => detail.message).join(', '));
        }

        try {
            const user = await loginUser(req.body.email, req.body.password);
            if (!user) {
                throw new AuthenticationError('Invalid email or password');
            }

            req.session.user = {
                id: user._id,
                role: user.role,
                email: user.email,
                username: user.username,
            };
            res.json({ message: 'Logged in 🛜', user: req.session.user });
        } catch (dbError) {
            if (dbError.name === 'MongoError') {
                throw new AppError('Database error occurred', 500);
            }
            throw dbError;
        }
    } catch (err) {
        next(err);
    }
};

export const logout = (req, res) => {
    req.session.destroy(() => res.json({ message: 'Logged out 👋' }));
};
 