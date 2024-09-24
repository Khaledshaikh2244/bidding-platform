import ErrorHandler from "../middlewares/error";
import {v2 as cloudinary} from 'cloudinary';
import { User } from "../models/userSchema";
export const register =async (req,res,next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Profile Image Required", 401));
    }

 const {profileImage} = req.files;

 const allowedFormats = ["image/png","image/jpeg","image/webp"];
// 
 if(!allowedFormats.includes(profileImage.mimetype)){
    return next(new ErrorHandler("Files format not supported",400));
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

  res.status(200).json({
    success : true,
    message  : "User Registered",
    
  })

}

