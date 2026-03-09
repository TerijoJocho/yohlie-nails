import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmail({ client_name, client_email, client_choices, date, time }) {
  const choicesList = client_choices?.length > 0
    ? client_choices.join(", ")
    : "Aucune prestation sélectionnée";

  await resend.emails.send({
    from: "Yohlie Nails <onboarding@resend.dev>",
    to: client_email,
    subject: "Confirmation de réservation",
    text: `Bonjour ${client_name}, votre réservation est confirmée pour le ${date} à ${time}.\n\nPrestation(s) : ${choicesList}\n\nMerci,\nYohlie Nails.`,
  });

  await resend.emails.send({
    from: "Yohlie Nails <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL,
    subject: "Nouvelle réservation",
    text: `${client_name} a réservé le ${date} à ${time}.\nPrestation(s) : ${choicesList}`,
  });
}