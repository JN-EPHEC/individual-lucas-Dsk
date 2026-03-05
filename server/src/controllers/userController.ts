import type { Request, Response } from "express";
import User from "../models/User";


//récupère tous les utilisateurs
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

//ajoute un utilisateur + vérif email correct
export const createUser = async (req: Request, res: Response) => {
    try {
        const { nom, prenom, email } = req.body;

        // Vérification format email
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: "Email invalide" });
        }

        const user = await User.create({ nom, prenom, email });
        res.json(user);

    } catch (err: any) {

        // Erreur email déjà existant
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ error: "Cet email existe déjà" });
        }

        // Erreur format email Sequelize
        if (err.name === "SequelizeValidationError") {
            return res.status(400).json({ error: "Format email incorrect" });
        }

        res.status(500).json({ error: err.message });
    }
};

// supprime un utilisateur
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deleted = await User.destroy({ where: { id } });

        if (deleted === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.json({ message: "Utilisateur supprimé" });
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};
