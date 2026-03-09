import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db/init.js";

import slotsRoutes from "./routes/slots.js";
import booksRoutes from "./routes/bookingSlots.js";
import adminSlotsRoutes from "./routes/adminSlots.js"
import adminAuthRoutes from "./routes/adminAuth.js"
import {adminAuth} from "./middlewares/adminAuth.js";

//lit le .env et ajoute ses variable a process.env
dotenv.config();

//creer l'instance du serveur express -> app.get, app.post, app.use
const app = express();
//on prend soit le port de l'env soit 3001
const PORT = process.env.PORT || 3001;

// Middlewares
//autorise toutes les req venant d'un autre domaine http(front react)
const allowedOrigins = [
  "https://yohlie-nails.netlify.app",     // prod
  "http://localhost:5173",                // dev local Vite
  "http://localhost:4173",                // preview vite build
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
//transforme automatiquement le body des requêtes POST en objet JS ; json -> obj js
app.use(express.json());

// Route de test -> verifie que le serveur fonctionne
app.get("/", (req, res) => {
  res.json({ message: "API Yohlie Nails is running 🚀" });
});

// Routes
app.use("/slots", slotsRoutes);
app.use("/book", booksRoutes);
app.use("/admin/slots", adminAuth, adminSlotsRoutes);
app.use("/admin", adminAuthRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
