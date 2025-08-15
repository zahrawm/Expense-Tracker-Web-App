import express from "express";
import {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} from "../controllers/expenseControllers";
import { protect } from "../middleware/authMidddleware";


const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/", protect, getAllExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/download/excel", protect, downloadExpenseExcel);

export default router;