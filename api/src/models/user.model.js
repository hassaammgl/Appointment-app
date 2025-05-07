import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['receptionist', 'ceo', 'cto', 'manager', 'cfo'],
        required: true
    }
});

userSchema.pre('save', async function (next) {
    if (this.role === 'ceo') {
        const existingCEO = await mongoose.models.User.findOne({ role: 'ceo' });

        // If another CEO exists and it's not this user
        if (existingCEO && existingCEO._id.toString() !== this._id.toString()) {
            const error = new Error('A CEO already exists in the system');
            // @ts-ignore
            error.statusCode = 400;
            return next(error);
        }
    }

    next();
});


export default mongoose.model('User', userSchema);
