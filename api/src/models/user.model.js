import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['receptionist', 'ceo', 'cto', 'gm', 'cfo'],
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    fcmTokens: [{ type: String, unique: true }]
});

userSchema.pre('save', async function (next) {
    if (this.role === 'ceo') {
        const existingCEO = await mongoose.models.User.findOne({ role: 'ceo' });

        if (existingCEO && existingCEO._id.toString() !== this._id.toString()) {
            const error = new Error('A CEO already exists in the system');
            error.statusCode = 400;
            return next(error);
        }
    }

    next();
});

export default mongoose.model('User', userSchema);
