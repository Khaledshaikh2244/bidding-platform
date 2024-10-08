import ErrorHandler from "../middlewares/error.js";
import {v2 as cloudinary} from 'cloudinary';
import { User } from "../models/userSchema.js";
import { catchAsynchError } from "../middlewares/catchAsyncError.js";
import { generateToken } from "../utils/jwtToken.js";


 const register = async (req,res,next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Profile Image Required", 401));
    }
    if (Object.keys(req.files).length > 1) {
  return next(new ErrorHandler("Please upload only one file", 401));
}
 const {profileImage} = req.files;

 const allowedFormats = ["image/png","image/jpeg","image/webp"];
 const maxSize = 5 * 1024 * 1024;

 if(!allowedFormats.includes(profileImage.mimetype)){
    return next(new ErrorHandler("Files format not supported",400));
 }

 if(profileImage.size > maxSize){
    return next(new ErrorHandler("File exceeds size limit"));
 }

 const {
     userName,
     email,
     password,
     phone,
     address,
     role,
     bankAccountNumber, 
     bankAccountName,
     bankName,
     razorPayAccountNumber,
     paypalEmail,
    } = req.body
 
    if(!userName || !email || !phone || !password || !address || !role){
        return next(new ErrorHandler("All fields are manadatory",400));
    }

    // role validation

    if(role === "Auctioneer"){
        if(!bankAccountName || !bankAccountNumber || !bankName){
            return next(new ErrorHandler("please provide complete bank details", 400));
        }

        if(!razorPayAccountNumber){
            return next(new ErrorHandler("please provide razorpay details", 400));
        }

        if(!paypalEmail){
            return next(new ErrorHandler("please provide paypal email ", 400));
        }
    }
 
    const isRegistered =  await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("User Already exists man !",400));
    }
  const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath,{
    folder : "MERN_BIDDING_PLATFORM_USERS",
  })

  // console.log(cloudinaryResponse);
  if(!cloudinaryResponse || cloudinaryResponse.error){
    console.error("Cloudinary error", cloudinaryResponse.error || "Unknown cloudinary error");
    return next(new ErrorHandler("Failed to upload profile image to cloudinary",500));
  }
 
  const user  =  await User.create({
    userName,
     email,
     password,
     phone,
     address,
     role,
     profileImage : {
        public_id  : cloudinaryResponse.public_id,
        url  : cloudinaryResponse.secure_url,
     },
     paymentMethod : {
        bankAccountNumber ,
        bankAccountName, 
        bankName,
      },
  })

// accesing user from above
  generateToken(user,"User Registered",201,res)

  // res.status(200).json({
  //   success : true,
  //   message  : "User Registered",user
  // })

}
export const registerController = catchAsynchError(register);



const login = async (req,res,next) => {
  const {email,password} =  req.body;

  if(!email,!password){
    return next(new ErrorHandler("please fill full form "));
  }

  const user = await User.findOne({email}).select("+password");
  if(!user){
    return next(new ErrorHandler("Inavlid credentials",400)); 
  }
  // via userSchema
  const isvalidPassword= await user.comparePassword(password);
  if(!isvalidPassword){
  return next(new ErrorHandler("Wrong password ",401));
  }

  generateToken(user, "Login Successfully",200,res);  
}; 
export const loginController = catchAsynchError(login);




const getProfile = async (req,res,next) => {
  const user = req.user;
  res.status(200).json({
    success : true,
    user,
  })
};
export const getProfileController = catchAsynchError(getProfile);




const logout = async (req,res,next) => {
    res.status(200).cookie("token","",{
      expires: new Date(Date.now()),
      httpOnly : true,
    }).json({
      success : true,
      message : "Logout Successfully"
    })
};
export const logoutController = catchAsynchError(logout);




const fetchLeaderBoard = async (req,res,next) => {
  const users = await User.find({moneySpent: {$gt:0}});
  const leaderboard = users.sort((a,b) => b.moneySpent - a.moneySpent);
  res.status(200).json({
    success : true,
    leaderboard,
  })
};
export const leaderboardController = catchAsynchError(fetchLeaderBoard);

