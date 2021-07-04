import UserModel from "../models/user.js";
import _ from "lodash";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (_.isEmpty(user)) {
      return res.status(404).json({ message: "User not found!!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const fields = req.body;

  try {
    let user = await UserModel.findById(userId);

    if (_.isEmpty(user)) res.status(404).json("User not found!!");

    Object.keys(fields).forEach((key) => (user[key] = fields[key]));

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message || error.toString() });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ id, message: "User deleted", status: 200 });
  } catch (error) {
    res.status(400).json({ message: error.message || error.toString() });
  }
};
