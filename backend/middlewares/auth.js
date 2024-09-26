import ErrorHandler from "./error.js";
import { catchAsynchError } from "./catchAsyncError.js";
import {User}  from '../models/userSchema.js';
import jwt from 'jsonwebtoken';

const isAuthenticated = async (req,res,next) => {
    const token = req.cookies.token;
    const isLogout = req.path === '/logout';

    if(!token){
        const errorMessage = isLogout ? 'Aleady logged out' : 'User not authenticated';
        return next(new ErrorHandler(errorMessage,400));
    }

    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if(!decoded || !decoded.id){
      return next(new ErrorHandler("Invalid Token",401));
    }

    req.user = await User.findById(decoded.id);
    if(!req.user){
        return next(new ErrorHandler("User not found",404));
    }
    next();
}

export const authMiddleware = catchAsynchError(isAuthenticated);