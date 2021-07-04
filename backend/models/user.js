import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      default: "Unmarried",
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
