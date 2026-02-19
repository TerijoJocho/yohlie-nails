import { useState } from "react";
import Footer from "../clients/Footer.jsx";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Erreur de connexion");
      return;
    }

    localStorage.setItem("adminToken", data.token);
    console.log("Admin connecté !");
    onLogin();
  }

  return (
    <>
      <header>
        <p className="mt-5 mb-0 text-center text-[25px] font-bold text-[#EEB1D5]">
        Yohlie Nails
        </p>
        <p className="mt-0 mb-5 text-center text-[12.8px] font-normal text-[#85756E]">
          French Manucure at home
        </p>
      </header>
      <form onSubmit={handleLogin} className="flex flex-col rounded-md text-[#1C0F13] w-fit self-center">
        <label className="p-3 text-[18px] font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="votre-email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-[30px] rounded-sm border border-[#DB7093] p-3 text-[18px]"
          required
        />

        <label
          className="p-3 text-[18px] font-medium"
          htmlFor="password"
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="***************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-[30px] rounded-[4px] border border-[#DB7093] p-3 text-[18px]"
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          className="btn global-hover justify-center"
          type="submit"
        >
          Se connecter
        </button>
      </form>
    </>
  );
}
