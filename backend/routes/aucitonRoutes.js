import {auctionController} from "../controllers/auctionController.js"
import {authMiddleware, authorizedMidleware} from "../middlewares/auth.js"
import express from "express";


const router = express.Router();


router.post("/create",authMiddleware,authorizedMidleware("Auctioneer"),auctionController);


export default router;