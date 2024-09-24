import mongoose from 'mongoose';


export const  connection = () => {
mongoose.connect(process.env.MONGO_URI,{
    dbName : "MERN_BIDDING_PLATFORM"
}).then(() => {
    console.log("connected to Db")
}).catch((err) => {
    console.error(`some error  db: ${err}` );
});
}



