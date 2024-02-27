import { Router } from "express";
import {
  addToWatchlist,
  createUser,
  deleteFromWatchlist,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/UserController.js";
import multer from "multer";
import { storage } from '../Middleware/multerStorage.js'

const upload = multer({ storage: storage })

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", upload.single('avatar'), createUser);
userRouter.put("/:id", upload.single('avatar'), updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/:id/watchlist", addToWatchlist); 
userRouter.delete("/:id/watchlist", deleteFromWatchlist ); 

