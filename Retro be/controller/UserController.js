import { UserModel } from "../model/UserModel.js";
import bcrypt from "bcrypt";
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await UserModel.findById(id);
    res.send(User);
  } catch (error) {
    res.send(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password, image, nickName } = req.body;
    const hash = bcrypt.hashSync(password, 12);
    const newUser = new UserModel({ email, password: hash, image, nickName });
    await newUser.save();

    res.send("New User Created!");
  } catch (error) {
    res.send(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nickName, password, role } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(id, {
      image: req.static ? "http://localhost:3003/static/" + req.static : null,
      nickName,
      password,
      role,
    });
    
    res.send("User Updated!");
  } catch (error) {
    res.send(error.message);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const delUser = await UserModel.findByIdAndDelete(id);

    res.send("Selected User deleted!");
  } catch (error) {
    res.send(error.message);
  }
};

export const addToWatchlist = async (req, res) => {
  try {
    const { userId, filmId } = req.body; 
    const user = await UserModel.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.wishlist.push(filmId);
    await user.save();

    res.send("Film added to watchlist successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};export const deleteFromWatchlist = async (req, res) => {
  try {
    const { userId, filmId } = req.body; 
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return res.status(404).send("User not found");
    }

    const index = user.wishlist.indexOf(filmId);
    
    if (index === -1) {
      return res.status(404).send("Film not found in watchlist");
    }

    user.wishlist.splice(index, 1);
    await user.save();

    res.send("Film deleted from watchlist successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
