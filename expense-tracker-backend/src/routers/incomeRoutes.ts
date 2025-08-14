import express from "express";
import {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} from "../controllers/incomeControllers";
import { protect } from "../middleware/authMidddleware";


const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/download/excel", protect, downloadIncomeExcel);

export default router;