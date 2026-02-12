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

export default router;