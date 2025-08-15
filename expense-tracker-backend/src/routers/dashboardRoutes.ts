import express from "express";
 import { protect } from "../middleware/authMidddleware";
import { getDashBoardData } from "../controllers/dashboardControllers";
 
 const router = express.Router();

router.get("/", protect, getDashBoardData);

 export default router;