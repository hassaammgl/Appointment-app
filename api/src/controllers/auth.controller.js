import { registerUser, loginUser } from '../services/auth.service.js';

export const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: 'User created 🎉', user });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await loginUser(req.body.email, req.body.password);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        req.session.user = { id: user._id, role: user.role };
        res.json({ message: 'Logged in 🛜', user: req.session.user });
    } catch (err) {
        next(err);
    }
};

export const logout = (req, res) => {
    req.session.destroy(() => res.json({ message: 'Logged out 👋' }));
};
