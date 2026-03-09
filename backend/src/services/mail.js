import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) 
    console.log("SMTP connection error:", error);
  else 
    console.log("SMTP server is ready to send emails");
});

export function sendBookingEmail({ client_name, client_email, client_choices, date, time }) {
  const choicesList = client_choices && client_choices.length > 0
    ? client_choices.join('\n     ')
    : 'Aucune prestation sélectionnée';
  
  const mailOptionsClient = {
    from: `"Yohlie Nails" <${process.env.SMTP_USER}>`,
    to: client_email,
    subject: "Confirmation de réservation",
    text: `
      Bonjour ${client_name},

      votre réservation a bien été prise en compte pour le ${date} à ${time} pour la/les prestation(s) suivante(s):
      
      ${choicesList}

      Merci pour votre confiance.
      Bien à vous,
      Yohlie Nails.
    `,
  };

  const mailOptionsAdmin = {
    from: `"Yohlie Nails" <${process.env.SMTP_USER}>`,
    to: `${process.env.SMTP_USER}`,
    subject: "Nouvelle réservation",
    text: `
      ${client_name} a réservé(e) le ${date} à ${time} pour la/les prestation(s) suivante(s):
      ${choicesList}
    `,
  };

  return Promise.all([
    transporter.sendMail(mailOptionsClient),
    transporter.sendMail(mailOptionsAdmin),
  ]);
}
