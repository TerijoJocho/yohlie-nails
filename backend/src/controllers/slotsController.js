/* 
    Controller que pour le client afin qu'il puisse recupérer
    les slots de dispo
*/

import { db } from "../db/database.js";

//route qui recupere tout les creneaux
export const getSlots = (req, res) => {
  try {
    // prepare la req SQL et retourne toutes les lignes sous forme de tableau js
    // const slots = db.prepare("SELECT * FROM slots WHERE is_available = 1 ORDER BY date, time").all();
    const slots = db.prepare("SELECT * FROM slots ORDER BY date, time").all();
    //envoie le tab en json au front
    res.json(slots);
  } catch (error) {
    // si qqchose plante coté serveur on renvoie 500 Internal Server Error
    console.error(error);
    res.status(500).json({ error: "Impossible de récupérer les créneaux" });
  }
};