/**
 * Controller client pour qu'il puisse reserver un slot
 */

import { db } from "../db/database.js";
import { sendBookingEmail } from "../services/mail.js";

//pour reserver un slot
export async function postBook(req, res) {
  const { id, client_name, client_email } = req.body;
  console.log(`Début des emails`)

  if (!id || !client_name || !client_email) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const slot = db.prepare("SELECT * FROM slots WHERE id = ?").get(id);

  if (!slot || !slot.is_available) {
    return res.status(400).json({ message: "Slot non disponible" });
  }

  // Réserver le créneau
  db.prepare(`
    UPDATE slots
    SET is_available = 0,
        client_name = ?,
        client_email = ?
    WHERE id = ?
  `).run(client_name, client_email, id);

  try {
      await sendBookingEmail({client_name, client_email, date: slot.date, time: slot.time});
      console.log("Emails envoyés avec succès");
    } catch (err) {
      console.log("Erreur email de confirmation:", err);
    }

  res.json({ message: "Créneau réservé avec succès ✅", slot_id: id });
};