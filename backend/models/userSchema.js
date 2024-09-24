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
        type : srting ,
        selected :  false,
        minLenght : [8, "password must contains atleast 3 characters"],
        maxLenght : [32, "password must more than 40 characters"]
    },

    email : Srting,
    address: Srting,

    phone : {
        type : srting ,
        minLenght : [10, "phone number must contains  10 characters"],
        maxLenght : [10, "phone number must contains  10 characters"]
    },

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
        type : Srting,
        default : 0,
    },

    auctionWon :{
        type : Srting,
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