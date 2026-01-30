import Database from "better-sqlite3";

// Ouvre (ou crée) le fichier DB
export const db = new Database("./src/db/slots.db");

// Cette DB est maintenant prête pour les requêtes SQL