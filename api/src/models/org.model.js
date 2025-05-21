import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  premiumStartedAt: { type: Date, default: Date.now },
  premiumExpiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  },
  isPremium: {
    type: Boolean,
    default: true 
  }
});

organizationSchema.methods.updatePremiumStatus = function () {
  const now = new Date();
  if (this.premiumExpiresAt < now) {
    this.isPremium = false;
  }
};

export default mongoose.model('Organization', organizationSchema);
