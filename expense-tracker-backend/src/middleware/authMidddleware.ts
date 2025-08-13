import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from '../models/Users'; 


interface AuthenticatedRequest extends Request {
    user?: any;
    userId?: any;
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        req.user = await User.findById(decoded.id).select('-password');
        req.userId = decoded.id; 
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};