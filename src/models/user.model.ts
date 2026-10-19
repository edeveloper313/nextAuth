import mongoose from "mongoose";
interface UserI extends Document {
  userName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
  verifyTokenString?: string;
  verifyTokenExpiry?: Date;
}
const userSchema = new mongoose.Schema<UserI>({
  userName: {
    type: String,
    required: [true, "Please enter the name"],
    unique: [true, "Please enter the uniqe user name"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Please enter the uniqe email"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordExpiry: {
    type: Date,
  },
  verifyTokenString: {
    type: String,
  },
  verifyTokenExpiry: {
    type: Date,
  },
});

const User =
  mongoose.models.users || mongoose.model<UserI>("users", userSchema);

export default User;
