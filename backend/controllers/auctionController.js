import {Auction} from '../models/auctionSchema.js';
import { catchAsynchError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js'
import { User } from '../models/userSchema.js';
import {v2 as cloudinary} from 'cloudinary';

const addNewAuctionItem =  ( async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Auction item image required", 400));
    }

    const { image } = req.files;

    // const allowedFormats = ["image/png", "image/jpeg", "image/.webp"];
    // if (!allowedFormats.includes(image.mimetype)) {
    //     return next(new ErrorHandler("files format not suportd", 401));
    // }

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(image.mimetype)) {
    return next(new ErrorHandler("File format not supported.", 400));
  }

    const { title, description,category,auctionStatus,startingBid,startTime ,endTime} = req.body
        
    if(!title || !description || !category || !auctionStatus || !startingBid || !startTime || !endTime){
        return next(new ErrorHandler("Please provide the details",400))
    }


    if(new Date(startTime)<Date.now()){
        return next(new ErrorHandler("Bidding Starttime should not be present time",400));
    }

    if(new Date(startTime) >= new Date(endTime)){
        return new next(new ErrorHandler("Bidding startTime must be less than endTime",400));
    }

   const alreadyOneAuctionActive = await Auction.find({
    createdBy : req.user._id,
    endTime :  {$gt : Date.now()}
   });


//    console.log("this is active",{alreadyOneAuctionActive});
//    console.log(alreadyOneAuctionActive.length);

   if(alreadyOneAuctionActive.length > 0){
    return next(new ErrorHandler("you alreadty have one active auction"));
   }

   try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath,
        {
            folder : "MERN_BIDDING_PLATFORMS_AUCITONS",
        }
    );

    // console.log("this is cld :",cloudinaryResponse);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary error:"),
        cloudinaryResponse.error || "Unknown cloudinary error."
    };

    const auctionItem = await Auction.create({
        title,
        description,
        category,
        auctionStatus,
        startingBid,
        startTime,
        endTime,
        image : {
            public_id : cloudinaryResponse.public_id,
            url : cloudinaryResponse.secure_url,
        },
        createdBy : req.user._id,
    });
    // console.log(`this is from auctionContrller: ${createdBy}`)
    // console.log(auctionItem)
    return res.status(201).json({
        meassage : `Auction is created and will be liste on ${startTime}`,
        auctionItem,
    });
   } catch (error) {
    console.error( "after auctionItem errror", error);
    return next(new ErrorHandler(error.meassage || "Failed to create Auction",500));
   }
})

export const auctionController =  catchAsynchError(addNewAuctionItem);