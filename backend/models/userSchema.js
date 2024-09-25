import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = ({
    userName :  {
        type : String,
        minLenght : [3, "Username must contains atleast 3 characters"],
        maxLenght : [40, "Username must more than 40 characters"],
    },

    password : {
        type : String ,
        selected :  false,
        minLenght : [8, "password must contains atleast 3 characters"],
        maxLenght : [32, "password must more than 40 characters"]
    },

    email : String,
    address: String,

    phone : {
        type : String ,
        minLenght : [10, "phone number must contains  10 characters"],
        maxLenght : [10, "phone number must contains  10 characters"]
    },
// this will be from cloudinary
    profileImage :{
        public_id : {
            type : String , 
            require  : true,
        },

        ulr : {
            type : String,
            require : true,
        },
    },

    paymentMethod : {
      bankTransfer : {
        bankAccountNumber  : String,
        bankAccountName :  String, 
        bankName : String,
      },
       
      razorpay : {
        razorPayAccountNumber : Number,     
    },

    paypal : {
        paypalEmail : String,  
    },

    },

    

    role : {
        type :String,
        enum : ["Auctioneer" , "Bidder","Super Admin"] 
    },

    unpaidCommision : {
        type : String,
        default : 0,
    },

    auctionWon :{
        type : String,
        default : 0,
    },

    moneySpent : {
        type : Number,
        default : Date.now,
    },
    createdAt : {
        type : Date,
        default :Date.now,
    },
})


export const User = mongoose.model("User",userSchema );