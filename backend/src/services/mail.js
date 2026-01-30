import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) console.log("SMTP connection error:", error);
  else console.log("SMTP server is ready to send emails");
});

export function sendBookingEmail({ client_name, client_email, date, time }) {
  console.log("SMTP_HOST:", JSON.stringify(process.env.SMTP_HOST));
  console.log("SMTP_PORT:", JSON.stringify(process.env.SMTP_PORT));
  console.log("SMTP_USER:", JSON.stringify(process.env.SMTP_USER));
  console.log("SMTP_PASS:", JSON.stringify(process.env.SMTP_PASS));
  console.log("SMTP_PASS length:", process.env.SMTP_PASS?.length);

  const mailOptionsClient = {
    from: `"Yohlie Nails" <${process.env.SMTP_USER}>`,
    to: client_email,
    subject: "Confirmation de réservation",
    text: `Bonjour ${client_name}, votre réservation à été prise en compte pour le ${date} à ${time}, merci pour votre confiance. Bien à vous Yohlie Nails.`,
  };

  const mailOptionsAdmin = {
    from: `"Yohlie Nails" <${process.env.SMTP_USER}>`,
    to: `${process.env.SMTP_USER}`,
    subject: "Nouvelle réservation",
    text: `${client_name} à réservé(e) le ${date} à ${time}.`,
  };

  return Promise.all([
    transporter.sendMail(mailOptionsClient),
    transporter.sendMail(mailOptionsAdmin),
  ]);
}
