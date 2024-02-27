import express from 'express'
import { refreshToken, userLogin, userRegister } from '../controller/AuthController.js'
import multer from 'multer'
import { storage } from '../Middleware/multerStorage.js'
export const authRoute = express.Router()
const upload = multer({ storage: storage })
authRoute.post('/login',userLogin )

authRoute.post('/register',upload.single('avatar'), userRegister)
authRoute.post("/refresh-token", refreshToken);
