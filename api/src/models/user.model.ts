import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the user roles as a type
export type UserRole = 'receptionist' | 'ceo' | 'cto' | 'gm' | 'cfo';

// Interface for the User document
export interface IUser extends Document {
	_id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    organization: mongoose.Types.ObjectId;
}

interface CustomError extends Error {
    statusCode?: number;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['receptionist', 'ceo', 'cto', 'gm', 'cfo'] as const,
        required: true
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
});

userSchema.pre<IUser>('save', async function (next) {
    if (this.role === 'ceo') {
        const User = mongoose.models.User as Model<IUser>;
        const existingCEO = await User.findOne({ role: 'ceo' });

        if (existingCEO && existingCEO?._id.toString() !== this._id?.toString()) {
            const error: CustomError = new Error('A CEO already exists in the system');
            error.statusCode = 400;
            return next(error);
        }
    }

    next();
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;