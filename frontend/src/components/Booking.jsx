import { useState } from "react";

export default function Booking({
    slot,
    name,
    setName,
    email,
    setEmail,
    onSuccess,
    fetchSlots
}) {
    const [confirmationMessage, setConfirmationMessage] = useState("")
    function handleBooking(e) {
        e.preventDefault();
        fetch("http://localhost:3001/book", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: slot.id,
                client_name: name,
                client_email: email
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setConfirmationMessage(`Réservation confirmée pour le ${slot.date} à ${slot.time} !`)
                fetchSlots();
                setTimeout(() => {
                    onSuccess();
                }, 2000);
            })
    }

    return (
        <>
            <form onSubmit={handleBooking}>
                <p>Réservation pour le {slot.date} à {slot.time}</p>

                <label htmlFor="name">Votre nom et prenom</label>
                <input 
                    id="name"
                    type="text"
                    placeholder="Gonzales Ricardo"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />

                <label htmlFor="email">Votre email</label>
                <input 
                    id="email"
                    type="email"
                    placeholder="ricardo.gonzales@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <button>Confirmer</button>
            </form>

            {confirmationMessage && (
                <p className="confirmation">{confirmationMessage}</p>
            )}
        </>
    )
}