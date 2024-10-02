import {auctionController, getAllItemsController, getAuctionDetailsController, getMyAuctionitemsController, removeFromAuctionController, republishItemsController} from "../controllers/auctionController.js"
import {authMiddleware, authorizedMidleware} from "../middlewares/auth.js"
import express from "express";


const router = express.Router();


router.post("/create",authMiddleware,authorizedMidleware("Auctioneer"),auctionController);

router.get("/allitems",getAllItemsController);  

router.get("/auction/:id",authMiddleware,getAuctionDetailsController); 

router.get("/myitems",authMiddleware, authorizedMidleware("Auctioneer"),getMyAuctionitemsController) 

router.delete("/delete/:id",authMiddleware, authorizedMidleware("Auctioneer"),removeFromAuctionController);

router.put("/item/republish/:id",authMiddleware, authorizedMidleware("Auctioneer"),republishItemsController)

export default router;

