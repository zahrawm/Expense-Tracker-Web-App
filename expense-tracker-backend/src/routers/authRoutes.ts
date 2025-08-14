import express from 'express';
import { getUserInfo, loginUser, registerUser } from '../controllers/authControllers';
import { protect } from '../middleware/authMidddleware';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', protect, getUserInfo);
router.post('/upload', protect, upload.single('file'), (req, res) => {
   if (!req.file) {
       return res.status(400).json({ message: 'No file uploaded' });
   }
    const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
   res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

export default router;