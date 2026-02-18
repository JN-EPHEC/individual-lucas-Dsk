import { Router, type Request, type Response } from 'express';
import User from '../models/User';

const router = Router();

// GET /api/users
router.get('/', async (req: Request, res: Response) => {
  try {
    const utilisateurs = await User.findAll();
    res.json(utilisateurs);
  } catch (err) {
    console.error("Erreur GET /api/users:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST /api/users
router.post('/', async (req: Request, res: Response) => {
  const { prenom, nom, telephone } = req.body;

  if (!prenom || !nom || !telephone) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  const telRegex = /^0[1-9][0-9]{7,8}$/;
  if (!telRegex.test(telephone)) {
    return res.status(400).json({ message: "Format téléphone invalide" });
  }

  try {
    const existing = await User.findOne({ where: { telephone } });
    if (existing) {
      return res.status(409).json({ message: "Téléphone déjà utilisé" });
    }

    const newUser = await User.create({ prenom, nom, telephone });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Erreur POST /api/users:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    await user.destroy();
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    console.error("Erreur DELETE /api/users/:id:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
