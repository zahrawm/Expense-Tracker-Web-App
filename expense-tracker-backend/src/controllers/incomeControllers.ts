import { Request, Response } from "express";
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import Income from "../models/Income";
import User from "../models/Users";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const addIncome = async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const { title, amount, category, description, date, icon, source } = req.body;
        if (!title || !amount || !category || !source) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }
        const income = new Income({
            title,
            amount,
            category,
            description,
            date,
            icon, 
            source,
            user: userId
        });
        await income.save();
        res.status(201).json(income);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getAllIncome = async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const incomes = await Income.find({ user: userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteIncome = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { id } = req.params;
    try {
        const income = await Income.findOneAndDelete({ _id: id, user: userId });
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const downloadIncomeExcel = async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const data = await Income.find({ user: userId });
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Incomes");
        
        // Ensure downloads directory exists
        const downloadDir = './downloads';
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }
        
        const filePath = `./downloads/incomes_${userId}.xlsx`;
        XLSX.writeFile(wb, filePath);
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}