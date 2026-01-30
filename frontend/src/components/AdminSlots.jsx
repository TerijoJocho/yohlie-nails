import { useState, useEffect } from "react"

export default function AdminSlots() {
    const [slots, setSlots] = useState([]);

    function fetchSlots() {
        fetch("http://localhost:3001/admin/slots", {
            headers: { "x-admin-token": import.meta.env.VITE_ADMIN_TOKEN }
        })
            .then(res => {
                if (!res.ok)
                    throw new Error(`HTTP ${res.status}`);
                    return res.json();
            })
            .then(data => setSlots(data))
            .catch(err => console.log("Erreur de fetch:", err))
    };

    useEffect(() => {
        fetchSlots();
    }, []);

    const groupedSlots = slots.reduce((acc, slot) => {
        if (!acc[slot.date])
            acc[slot.date] = [];
        acc[slot.date].push(slot);
        return acc;
    }, {});

    return (
        <section>
            {Object.keys(groupedSlots).map(date => {
                return (
                    <div key={date}>
                        <h3>{date}</h3>
                        <ul>
                            {groupedSlots[date].map(slot => {
                                return (
                                    <li key={slot.id}>{slot.time}</li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </section>
    )
}