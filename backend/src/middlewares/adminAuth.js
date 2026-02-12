/**
 * middleware pour l'auth de l'admin
 */

import jwt from "jsonwebtoken";

export function adminAuth(req, res, next) {
    const authHeader = req.headers.authorization;//Bearer TOKEN
    if (!authHeader)
        return res.status(401).json({error: "Token manquant"});

    const token = authHeader.split(" ")[1];//[Bearer, TOKEN]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//verifie la signature, l'expiration et la validité
        req.admin = decoded;//{adminId: 1, email:"xxx", iat: 123456, exp: xxxxxx} // on attaches l'admin à la requete
        next();//tout ok express continue
    } catch (err) {
        return res.status(403).json({error: "Token invalide ou expiré"});
    }
}