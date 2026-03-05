import express, { type Request, type Response } from 'express';
import { requestLogger } from './middlewares/logger';
import userRouter from './routes/userRoutes';
import sequelize from './config/database';
import './models/User';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ES Modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(requestLogger);

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "../public")));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route racine
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Routes API
app.use('/api/users', userRouter);

// Middleware d'erreurs
app.use(errorHandler);

// Connexion et synchro BDD
sequelize.authenticate()
    .then(() => console.log('Connexion DB réussie'))
    .catch(err => console.error('Erreur connexion DB :', err));

sequelize.sync().then(() => {
    console.log("Base de données synchronisée");
    app.listen(port, () => console.log(`Serveur lancé sur http://localhost:${port}`));
});