import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'
    });
};

export const registerUser = async (req: Request, res: Response) => {
    
};

export const loginUser = async (req: Request, res: Response) => {
    
};

export const getUserInfo = async (req: Request, res: Response) => {
    
};