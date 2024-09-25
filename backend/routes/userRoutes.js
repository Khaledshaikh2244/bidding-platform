import express from 'express';
import {leaderboardController, getProfileController, loginController, logoutController, registerController} from '../controllers/userController.js'

const router = express.Router();

router.post("/register", registerController);
router.post("/login",loginController);
router.get("/me",getProfileController)
router.get("/logout",logoutController);
router.get("/leaderboard",leaderboardController);

export default router;