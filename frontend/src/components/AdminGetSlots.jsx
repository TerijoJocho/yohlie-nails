import { useState, useEffect } from "react"

export default function AdminSlots() {
    const [slots, setSlots] = useState([]);

    function fetchSlots() {
        const token = localStorage.getItem("adminToken");

        fetch("http://localhost:3001/admin/slots", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}`}
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
                                    <button key={slot.id}>{slot.time}</button>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </section>
    )
}