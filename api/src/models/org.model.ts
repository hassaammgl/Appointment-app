import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for the Organization document
export interface IOrganization extends Document {
    name: string;
    premiumStartedAt: Date;
    premiumExpiresAt: Date;
    isPremium: boolean;
    updatePremiumStatus(): void;
}

const organizationSchema = new Schema<IOrganization>({
    name: { type: String, required: true, unique: true },
    premiumStartedAt: { type: Date, default: Date.now },
    premiumExpiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
    },
    isPremium: {
        type: Boolean,
        default: true
    }
});

organizationSchema.methods.updatePremiumStatus = function (this: IOrganization): void {
    const now = new Date();
    if (this.premiumExpiresAt < now) {
        this.isPremium = false;
    }
};

const Organization: Model<IOrganization> = mongoose.model<IOrganization>('Organization', organizationSchema);

export default Organization;