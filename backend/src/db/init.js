import { db } from "./database.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Création de la table des slots si elle n'existe pas déjà
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS slots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    is_available BOOLEAN DEFAULT 1,
    client_name TEXT,
    client_email TEXT
  )
`,
).run();

//creation de la table admin
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )`
).run();

// creation de l'admin s'il n'existe pas
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const existingAdmin = db
  .prepare("SELECT * FROM admin WHERE email = ?")
  .get(adminEmail);

if (!existingAdmin)
{
  const hash = bcrypt.hashSync(adminPassword, 10);

  db.prepare(`
    INSERT INTO admin (email, password_hash)
    VALUES (?, ?)
  `).run(adminEmail, hash);

  console.log("Admin créé !");
}
else
  console.log("Admin déjà créé");

console.log("Table slots créée ou déjà existante");
