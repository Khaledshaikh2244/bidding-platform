import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema ({
    userName :  {
        type : String,
        minLength : [3, "Username must contains atleast 3 characters"],
        maxLength : [40, "Username must more than 40 characters"],
    },

    password : {
        type : String ,
        selected :  false,
        minLength : [8, "password must contains atleast 8 characters"],
        maxLength : [32, "password must more than 40 characters"]
    },

    email : String,
    address: String,

    // phone : {
    //     type : Number,
    //     require : true,
    //     minLength : [10, "phone number must contains  10 characters"],
    //     maxLength : [10, "phone number must contains  10 characters"]
    // },
    phone: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /^\d+$/.test(v) && v.length === 10;
          },
          message: 'Phone number must be 10 digits'
        }
      },

// this will be from cloudinary
    profileImage :{
        public_id : {
            type : String , 
            require  : true,
        },

        url : {
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
        default : 0,
    },
    createdAt : {
        type : Date,
        default :Date.now,
    },
})

userSchema.pre('save',async function (next) {
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

 userSchema.methods.generateJsonWebToken = function(){
    return   jwt.sign({id : this._id},process.env.JWT_SECRET,{
        expiresIn :process.env.JWT_EXPIRE
    })
}
export const User = mongoose.model("User",userSchema );