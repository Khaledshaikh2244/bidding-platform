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

    phone : {
        type : srting ,
        minLenght : [10, "phone  must contains  10 characters"],
        maxLenght : [10, "phone  must contains  10 characters"]
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
      bankAccountNumber  : String,
      bankAccountScheme :  String, 
      bankName : String,
    },

    razorpay : {
        razorPayAccountNumber : Number,     
    },

    paypal : {
        type : String,  
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
    }
})