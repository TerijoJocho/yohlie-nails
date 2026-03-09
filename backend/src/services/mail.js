import dotenv from "dotenv";
dotenv.config();

export async function sendBookingEmail({ client_name, client_email, client_choices, date, time }) {
  const choicesList = client_choices?.length > 0
    ? client_choices.join(", ")
    : "Aucune prestation sélectionnée";

  const headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "api-key": process.env.BREVO_API_KEY,
  };

  await Promise.all([
    // Email au client
    fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: { name: "Yohlie Nails", email: process.env.ADMIN_EMAIL },
        to: [{ email: client_email, name: client_name }],
        subject: "Confirmation de réservation",
        textContent: `Bonjour ${client_name},\n\nVotre réservation est confirmée pour le ${date} à ${time}.\n\nPrestation(s) : ${choicesList}\n\nMerci pour votre confiance,\nYohlie Nails.`,
      }),
    }),

    // Email à l'admin
    fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: { name: "Yohlie Nails", email: process.env.ADMIN_EMAIL },
        to: [{ email: process.env.ADMIN_EMAIL }],
        subject: "Nouvelle réservation",
        textContent: `Client: ${client_name} \nEmail: (${client_email}) \na réservé le ${date} à ${time}.\nPrestation(s) : ${choicesList}`,
      }),
    }),
  ]);
}