import express, { type Request, type Response } from 'express';
import userRouter from './routes/userRoutes';
import sequelize from './config/database'; 
import './models/User';

const app = express();
const port = 3000;

// CORRECTION : placer express.json() avant les routes
app.use(express.json());

app.use('/api/users', userRouter);

function greet(name: string): string {
    return `Hello, ${name}!`;
}
let message = greet("Lucas");
console.log(message);

interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
}

const etudiants: Etudiant[] = [
    {id: 1, nom: "François", prenom: "Jean"},
    {id: 2, nom: "Colard", prenom: "Manon"},
    {id: 3, nom: "Docteur", prenom: "Mike"}
];

app.get('/api/data', (req: Request, res: Response) => {
    res.json(etudiants);
})

app.get('/api/hello/:name', (req: Request, res: Response) => {
    const name = req.params.name as string;

    const response = {
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString()
    };
    res.json(response);
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

app.use(express.static('public'));

sequelize.sync().then(() => {
    console.log("base de données Synchro");
    app.listen(port,() => {
        console.log("serveur ok")
    });
});
