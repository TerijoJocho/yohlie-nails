/**
 * Controllers d'admin pour ajouter et enelever des slots
 */

import { db } from "../db/database.js"

// route qui récupère tous les slots
export const getSlots = (req, res) => {
  try {
    const slots = db.prepare("SELECT * FROM slots ORDER BY date, time").all();
    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur récupération slots" });
  }
};

// route qui ajoute un slot
export const addSlot = (req, res) => {
  const { date, time } = req.body;

  if (!date || !time) {
    return res.status(400).json({ error: "Date et heure sont requises" });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO slots (date, time, is_available)
      VALUES (?, ?, 1)
    `);

    const info = stmt.run(date, time); // info.lastInsertRowid contient l'id généré

    res.json({
      message: "Créneau ajouté ✅",
      slot: {
        id: info.lastInsertRowid,
        date,
        time,
        is_available: 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible d'ajouter le créneau" });
  }
};

//route qui supprime un slot
export const deleteSlot = (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare(`
      DELETE FROM slots WHERE id = ?
    `);

    const result = stmt.run(id);

    // Si aucun slot supprimé → id inexistant
    if (result.changes === 0) {
      return res.status(404).json({ error: "Slot introuvable" });
    }

    res.json({ message: "Slot supprimé avec succés" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur suppression slot" });
  }
};