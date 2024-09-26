import mongoose, { Schema } from "mongoose";

const autionSchema  = new mongoose.Schema({
    title : String,
    description : String,
    starttingBid : Number,
    category :  String,

    auctionStatus : {
        type :String,
        enum : ["USED", "NEW"],
    },

    currentBid : {
        type : Number,
        default : 0,
    },
    startTime :String,
    endTime : String,

    image : {
        public_Id : {
            type : String,
            require : true,
        },

    url : {
        type : String,
        require : true,
    },
},

    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    bids: [
        {
            userId : {
                 type  : mongoose.Schema.Types.ObjectId,
                 ref  : "Bid"
            },
          
                userName : String,
                profileImage : String,
                amount : Number,
          
        },
    ],
        highestBidder : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User", 
        },

    commisionCalculated: {
        type : Boolean,
        default:  true,
    },
    createdAt :{
        type: Date,
        default : Date.now(),
    },
});

export const Auction = mongoose.model("Auction", autionSchema);