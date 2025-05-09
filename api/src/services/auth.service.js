import User from '../models/user.model.js';
import argon2 from 'argon2';

export const registerUser = async ({ username, email, password, role }) => {
    const hashed = await argon2.hash(password);
    const user = new User({ username, email, password: hashed, role });
    return await user.save();
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await argon2.verify(user.password, password))) return null;
    return user;
};
 