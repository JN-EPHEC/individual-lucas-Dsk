import { Router, type Request, type Response } from 'express';
import * as userController from "../controllers/userController";
const router = Router();

interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, prenom: "Lucas", nom: "Desbeek" },
    { id: 2, prenom: "Manon", nom: "Colard" },
];

router.get("/", userController.getAllUsers);

router.post('/', (req: Request, res: Response) => {
    // CORRECTION : vérifier que req.body existe
    if (!req.body) {
        return res.status(400).json({ error: "Body missing" });
    }

    const { prenom, nom } = req.body;

    const newUser: User = {
        id: users.length + 1,
        name: prenom + " " + nom
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users.splice(index, 1); 
        res.status(200).json({ message: "Utilisateur supprimé" });
    } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
    }
});


export default router;
