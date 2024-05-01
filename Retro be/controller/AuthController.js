import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/UserModel.js";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.nickName, role: user.role, email: email, image: user.image },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.json({ token }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const userRegister = async (req, res) => {
  const { nickName, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hash = bcrypt.hashSync(password, 12);

    const newUser = new UserModel({
      nickName,
      email,
      password: hash,
      image: req.static ? "https://retroarchivev2-0.onrender.com/static/" + req.static : null, // Set image field if req.static is available
    });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role,
        name: nickName,
        email: email,
        image: newUser.image,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
console.log(decoded);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, name: user.nickName, role: user.role, email: user.email, image: user.image },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

