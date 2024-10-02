import { config } from 'dotenv';
import express from 'express';
import { connection } from './database/conneciton.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { errorMiddleware } from './middlewares/error.js';
import userRouter from  "./routes/userRoutes.js";
import auctionRouter from "./routes/aucitonRoutes.js"
import { fileURLToPath } from 'url';
import {dirname, join} from 'path';
config({
    path : "./config/config.env"    
})

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


    app.use(cors({
        origin : [process.env.FRONTEND_URI],
        methods : ["POST","GET","PUT", "DELETE"],
        credentials : true,
    }))
    
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended :true}));
    app.use(
        fileUpload({
        useTempFiles : true,
        tempFileDir : join(__dirname, "temp"),
    })
)

    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/auctionitem",auctionRouter);

connection();

app.use(errorMiddleware );
export default app;