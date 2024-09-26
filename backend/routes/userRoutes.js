import express from 'express';
import {leaderboardController, getProfileController, loginController, logoutController, registerController} from '../controllers/userController.js'
import {authMiddleware} from '../middlewares/auth.js'
const router = express.Router();

router.post("/register", registerController);
router.post("/login",loginController);
router.get("/me",authMiddleware,getProfileController)
router.get("/logout",authMiddleware,logoutController);
router.get("/leaderboard",leaderboardController);

export default router;