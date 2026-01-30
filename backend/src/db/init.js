import { db } from "./database.js";

// Création de la table si elle n'existe pas déjà
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

console.log("Table slots créée ou déjà existante ✅");
