import mongoose, { Schema } from "mongoose";


interface IExpense extends Document {
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" };
  title: string;
  amount: number;
  category: string;
  description?: string;
  date: Date;
  icon?: string;
  source: string;
}

const ExpenseSchema = new Schema<IExpense>({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  },
  icon: {
    type: String,
    default: ""
  },
  source: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model<IExpense>("Expense", ExpenseSchema);