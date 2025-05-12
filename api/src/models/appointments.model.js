import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
    {
        visitorName: { type: String, required: true, trim: true, },
        visitorNo: { type: String, required: true, },
        visitorCnic: { type: String, required: true, },
        purpose: { type: String, required: true },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', },
        priority: {
            type: Number,
            default: 0,
        },
        priorityIndex: {
            type: Number,
            default: 0,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        notes: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);

