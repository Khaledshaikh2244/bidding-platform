import ErrorHandler from "./error.js";
import { catchAsynchError } from "./catchAsyncError.js";
import {User}  from '../models/userSchema.js';
import jwt from 'jsonwebtoken';


const isAuthenticated = async (req,res,next) => {
    const token = req.cookies.token;

    if(!token){
        return next(new ErrorHandler("User not authenticated"),400);
    }

    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
}