import mongoose, { Document, Schema, Model } from 'mongoose';

export type AppointmentStatus = 'pending' | 'approved' | 'rejected';

export interface IAppointment extends Document {
    visitorName: string;
    visitorNo?: string;
    visitorCnic?: string;
    purpose?: string;
    status: AppointmentStatus;
    priority: number;
    createdBy: mongoose.Types.ObjectId;
    to?: mongoose.Types.ObjectId | null;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
    {
        visitorName: { type: String, required: true, trim: true },
        visitorNo: { type: String },
        visitorCnic: { type: String },
        purpose: { type: String },
        status: { 
            type: String, 
            enum: ['pending', 'approved', 'rejected'] as const, 
            default: 'pending' 
        },
        priority: {
            type: Number,
            default: 0,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        to: {
            type: Schema.Types.ObjectId,
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

const Appointment: Model<IAppointment> = mongoose.model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;