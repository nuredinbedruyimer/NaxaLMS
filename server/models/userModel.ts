import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface NaxaUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: "user" | "admin";
  isVerified: boolean;
  courses: Array<{
    courseId: string;
  }>;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<NaxaUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username Is Required"],
    },
    email: {
      type: String,
      required: [true, "E-mail Is Required"],
      unique: true,
      match: [emailRegEx, "Invalid Email"],
    },
    password: {
      type: String,
      required: [true, "Password Is Required"],
      minlength: [6, "Password Must Be At Least 6 Characters Long"],
    },
    avatar: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

const User: Model<NaxaUser> = mongoose.model("User", userSchema);
export default User;
