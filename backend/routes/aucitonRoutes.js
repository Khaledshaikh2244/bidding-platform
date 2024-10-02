import {auctionController} from "../controllers/auctionController.js"
import {authMiddleware} from "../middlewares/auth.js"
import express from "express";


const router = express.Router();


router.post("/create",authMiddleware,auctionController);


export default router;