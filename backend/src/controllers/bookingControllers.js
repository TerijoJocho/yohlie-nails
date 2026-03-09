/**
 * Controller client pour qu'il puisse reserver un slot
 */

import { db } from "../db/database.js";
import { sendBookingEmail } from "../services/mail.js";

//pour reserver un slot
export async function postBook(req, res) {
  // console.log("1. Début de postBook");
  const { id, client_name, client_email, client_choices } = req.body;

  if (!id || !client_name || !client_email || !client_choices) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  // console.log("2. Avant SELECT slot");
  const slot = db.prepare("SELECT * FROM slots WHERE id = ?").get(id);

  // console.log("3. Slot trouvé:", slot);

  if (!slot || !slot.is_available) {
    return res.status(400).json({ message: "Slot non disponible" });
  }

  // console.log("4. Avant UPDATE");
  db.prepare(
    `
    UPDATE slots
    SET is_available = 0,
        client_name = ?,
        client_email = ?
    WHERE id = ?
  `,
  ).run(client_name, client_email, id);

  // console.log("5. Avant sendBookingEmail");
  function formatDate(strDate) {
    const date = new Date(strDate);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  try {
    await sendBookingEmail({
      client_name,
      client_email,
      client_choices,
      date: formatDate(slot.date),
      time: slot.time,
    });
    console.log("Emails envoyés avec succès");
  } catch (err) {
    console.log("Erreur email de confirmation:", err);
  }

  res.json({ message: "Créneau réservé avec succès ✅", slot_id: id });
}
