import jwt from "jsonwebtoken";
import { Request, Response } from "express";


import User from "../models/Users"; 

interface AuthenticatedRequest extends Request {
    userId?: any;
}

const generateToken = (id: any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'
    });
};

export const registerUser = async (req: Request, res: Response) => {
    const {name, email, password, profileImage } = req.body
    if(!name || !email || !password){
        return res.status(400).json({message : "All fields are required"})
    }
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
             return res.status(400).json({message : "Email already in use"})
        }

        const user = await User.create({
            name,
            email, 
            password, 
            profileImage
        });

        res.status(201).json({
            id: user._id,
            user, 
            token: generateToken(user._id),
          });
    } catch(err: any){
        res.status(500).json({message: "Error registering user",  error : err.message});
    }
};

export const loginUser = async (req: Request, res: Response) => {
          const { email, password } = req.body
    if(!email || !password){
        return res.status(400).json({message : "All fields are required"})
    }
    try{
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
             return res.status(400).json({message : "Invalid credentials"})
        }

        res.status(200).json({
            id: user._id,
            user, 
            token: generateToken(user._id),
          });
    } catch(err: any){
        res.status(500).json({message: "Error logging in user",  error : err.message});
    }
};

export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (err: any) {
        res.status(500).json({ message: "Error fetching user info", error: err.message });
    }
};