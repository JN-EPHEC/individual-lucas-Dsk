import type { Request, Response } from "express";
import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
    const users = await User.findAll();
    res.status(200).json(users);
    } catch (error) {
    res.status(500).json({ error: (error as any).message });
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { prenom, nom } = req.body;
        if (!prenom || !nom) return res.status(400).json({ error: "Champs manquants" });

        const newUser = await User.create({ prenom, nom });
        res.status(201).json(newUser);
    } catch (err) {
        next(err); 
    }
};