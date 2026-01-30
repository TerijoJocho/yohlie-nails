import { useState  } from "react";

export default function AddSlot() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:3001/admin/slots", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-admin-token": import.meta.env.VITE_ADMIN_TOKEN
            },
            body: JSON.stringify({
                date,
                time
            })
        })
            .then(res => res.json())
            .then(data => console.log(data));
        
        setDate("");
        setTime("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="date">Ajouter une date:</label>
            <input 
                id="date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
            />
            <label htmlFor="time">Ajouter une heure:</label>
            <input 
                id="time"
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                required
            />
            <button>Ajouter</button>
        </form>
    )
}