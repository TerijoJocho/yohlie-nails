import {db} from "../db/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function adminLogin(req, res) {
    const {email ,password} = req.body;
    if (!email || !password)
        return res.status(400).json({error: "Champs manquants"});

    const admin = db
        .prepare("SELECT * FROM admin WHERE email = ?")
        .get(email);
    if (!admin)
        return res.status(401).json({error: "Identifiant invalide"});

    const isValid = bcrypt.compareSync(password, admin.password_hash);
    if (!isValid)
        return res.status(401).json({error: "Mot de passe invalide"});

    const token = jwt.sign(
        {adminId: admin.id, email: admin.email},
        process.env.JWT_SECRET,
        {expiresIn: "2h"}
    );

    res.json({
        message: "Connexion admin reussie !",
        token
    });
};