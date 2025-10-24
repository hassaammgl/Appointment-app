import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deviceIds: [
    {
      type: String,
    },
  ],
  role: {
    type: String,
    enum: ["receptionist", "ceo", "cto", "gm", "cfo"],
    required: true,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  oneSignalIds: {
    type: [{ type: String }],
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  if (this.role === "ceo") {
    const User = mongoose.models.User;
    const existingCEO = await User.findOne({ role: "ceo" });

    if (existingCEO && existingCEO?._id.toString() !== this._id?.toString()) {
      const error = new Error("A CEO already exists in the system");
      error.statusCode = 400;
      return next(error);
    }
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
