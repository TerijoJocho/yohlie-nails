/**
 * middleware pour l'auth de l'admin
 */

import dotenv from "dotenv";

dotenv.config();

export function adminAuth(req, res, next) {
    const token = req.headers["x-admin-token"];

    if (!token || token !== process.env.ADMIN_TOKEN)
        return res.status(403).json({error: "Accès admin refusé"});
    
    next();
}