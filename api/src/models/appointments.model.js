import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
    {
        visitorName: { type: String, required: true, trim: true, },
        purpose: { type: String, required: true },
        // scheduledTime: {
        //     type: Date,
        //     required: true,
        // },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', },
        priority: {
            type: Number,
            default: 0, // 0 = normal, 1 = high, 2 = urgent, etc. Use CEO UI to sort based on this
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // receptionist user reference
            required: true,
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // CEO user reference
            default: null,
        },
        notes: {
            type: String, // optional internal notes
            default: '',
        },
    },
    { timestamps: true } // auto adds createdAt and updatedAt
);

export default mongoose.model('Appointment', appointmentSchema);
