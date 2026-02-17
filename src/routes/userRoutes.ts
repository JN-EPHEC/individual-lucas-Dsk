import { Router, type Request, type Response } from 'express';
const router = Router();

interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];

router.get('/', (req: Request, res: Response) => {
    res.json(users);
});

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

export default router;
