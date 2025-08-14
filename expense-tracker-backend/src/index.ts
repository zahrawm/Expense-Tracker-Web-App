import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import incomeRoutes from './routers/incomeRoutes';
import authRoutes from './routers/authRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));



app.get('/', (req, res) => {
  res.json({ message: 'Server running' });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});