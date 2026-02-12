import { useState } from "react";

export default function AdminLogin({onLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleLogin(e){
        e.preventDefault();

        const res = await fetch("http://localhost:3001/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email ,password}),
        });

        const data = await res.json();

        if (!res.ok)
        {
            setError(data.error || "Erreur de connexion");
            return ;
        }
            
        localStorage.setItem("adminToken", data.token);
        console.log("Admin connecté !");
        onLogin();

        //navigate("/admin");
    };

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input 
                id="email"
                name="email"
                type="email"
                placeholder="votre-email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label htmlFor="password">Mot de passe</label>
            <input 
                id="password"
                name="password"
                type="password"
                placeholder="mon-mot-de-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && <p style={{color: "red"}}>{error}</p>}

            <button type="submit">Se connecter</button>
        </form>
    );
}