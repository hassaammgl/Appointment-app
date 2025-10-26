import mongoose, { Schema } from "mongoose";

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      collation: { locale: "en", strength: 2 },
    },
    premiumStartedAt: {
      type: Date,
      default: Date.now,
    },
    premiumExpiresAt: {
      type: Date,
      default: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    isPremium: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

organizationSchema.methods.updatePremiumStatus = function () {
  const now = new Date();
  this.isPremium = !!this.premiumExpiresAt && this.premiumExpiresAt > now;
};

organizationSchema.virtual("premiumDaysLeft").get(function () {
  if (!this.premiumExpiresAt) return 0;
  const now = new Date();
  const diffMs = this.premiumExpiresAt - now;
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
});

organizationSchema.pre("save", function (next) {
  this.updatePremiumStatus();
  next();
});

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
