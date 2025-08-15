import { Request, Response } from "express";
import * as XLSX from 'xlsx';
import * as fs from 'fs';

import User from "../models/Users";
import Expense from "../models/Expense";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const addExpense = async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const { title, amount, category, description, date, icon, source } = req.body;
        if (!title || !amount || !category || !source) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }
        const expense = new Expense({
            title,
            amount,
            category,
            description,
            date,
            icon, 
            source,
            user: userId
        });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getAllExpense = async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteExpense = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { id } = req.params;
    try {
        const expense = await Expense.findOneAndDelete({ _id: id, user: userId });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const downloadExpenseExcel = async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const data = await Expense.find({ user: userId });
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Expenses");
        
        const downloadDir = './downloads';
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }
        
        const filePath = `./downloads/expenses_${userId}.xlsx`;
        XLSX.writeFile(wb, filePath);
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}