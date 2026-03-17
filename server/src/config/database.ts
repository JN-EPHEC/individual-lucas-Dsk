import { Sequelize } from "sequelize";

// Configuration directe pour Supabase
const sequelize = new Sequelize(
    "postgres", // nom DB
    "postgres", // user
    "Lucas.0606.DEV", // password
    {
        host: "db.oshkwntpyykzchxlpgcs.supabase.co",
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    }
);

// Test de connexion
sequelize.authenticate()
    .then(() => console.log("✅ Connexion à la DB réussie !"))
    .catch((err) => console.error("❌ Erreur connexion DB :", err));

export default sequelize;