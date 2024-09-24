import app from './app.js';
import { config } from 'dotenv';
import {v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

cloudinary.config({
cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
api_key :  process.env.CLOUDINARY_API_KEY,
api_secret : process.env.CLOUDINARY_API_SECRET,
})

app.use(cors({
    origin : [process.env.FRONTEND_URI],
    methods : ["POST","GET","PUT", "DELETE"],
    credentials : true,
}))

app.use(cookieParser());
app.use(express.json);
app.use(express.urlencoded({extended :true}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/temp/",
}))
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
});