import SibApiV3Sdk from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

export async function sendBookingEmail({ client_name, client_email, client_choices, date, time }) {
  const choicesList = client_choices?.length > 0
    ? client_choices.join(", ")
    : "Aucune prestation sélectionnée";

  const emailClient = new SibApiV3Sdk.SendSmtpEmail();
  emailClient.subject = "Confirmation de réservation";
  emailClient.to = [{ email: client_email, name: client_name }];
  emailClient.sender = { name: "Yohlie Nails", email: process.env.ADMIN_EMAIL };
  emailClient.textContent = `Bonjour ${client_name},\n\nVotre réservation est confirmée pour le ${date} à ${time}.\n\nPrestation(s) : ${choicesList}\n\nMerci pour votre confiance,\nYohlie Nails.`;

  const emailAdmin = new SibApiV3Sdk.SendSmtpEmail();
  emailAdmin.subject = "Nouvelle réservation";
  emailAdmin.to = [{ email: process.env.ADMIN_EMAIL }];
  emailAdmin.sender = { name: "Yohlie Nails", email: process.env.ADMIN_EMAIL };
  emailAdmin.textContent = `Client:${client_name} \n E-mail:(${client_email}) \na réservé le ${date} à ${time}.\nPrestation(s) : ${choicesList}`;

  await Promise.all([
    apiInstance.sendTransacEmail(emailClient),
    apiInstance.sendTransacEmail(emailAdmin),
  ]);
}