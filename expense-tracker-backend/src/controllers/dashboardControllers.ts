import { Request, Response } from "express";
import Expense from "../models/Expense";
import Income from "../models/Income";
const  {isValiidObjectId, Types} = require("mongoose")

export const getDashBoardData = async (req: Request, res: Response) => {
    
    try {
        
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));
         const totalIncome =await Income.aggregate([
            {$match : { user: userObjectId }},
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
         ]);
         console.log("Total Income: ", totalIncome);
         const totalExpense = await Expense.aggregate([
            { $match: { user: userObjectId } },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
         ]);
         console.log("Total Expense: ", totalExpense);
         res.status(200).json({
             totalIncome: totalIncome[0]?.total || 0,
             totalExpense: totalExpense[0]?.total || 0,
             balance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0)
         });
          const last60Days = new Date();
          last60Days.setDate(last60Days.getDate() - 60);
          const recentExpenses = await Expense.find({
              user: userObjectId,
              date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 1000) }
          });
          const recentIncomes = await Income.find({
              user: userObjectId,
              date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 1000) }
          });

          res.status(200).json({
              totalIncome: totalIncome[0]?.total || 0,
              totalExpense: totalExpense[0]?.total || 0,
              balance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
              recentExpenses,
              recentIncomes
          });
           const incomeLast60Days = recentIncomes.reduce((acc, income) => acc + income.amount, 0);
           const expenseLast60Days = recentExpenses.reduce((acc, expense) => acc + expense.amount, 0);
           res.status(200).json({
               totalIncome: totalIncome[0]?.total || 0,
               totalExpense: totalExpense[0]?.total || 0,
               balance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
               recentExpenses,
               recentIncomes,
               incomeLast60Days,
               expenseLast60Days
           });
           const lastTransactions = [...await Income.find({ user: userObjectId }).sort({ date: -1 }).limit(5), ...await Expense.find({ user: userObjectId }).sort({ date: -1 }).limit(5)];
           res.status(200).json({
               totalIncome: totalIncome[0]?.total || 0,
               totalExpense: totalExpense[0]?.total || 0,
               balance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
               recentExpenses,
               recentIncomes,
               incomeLast60Days,
               expenseLast60Days,
               lastTransactions
           });
       } catch (error) {
           res.status(500).json({ message: "Server error" });
       }
   }