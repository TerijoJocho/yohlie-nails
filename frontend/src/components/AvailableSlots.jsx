import { useState, useEffect } from "react";
import Booking from "./Booking";

export default function AvailableSlots() {
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [name, setName] = useState("");
    const [email ,setEmail] = useState("");

    function fetchSlots() {
        fetch("http://localhost:3001/slots")
            .then(res => res.json())
            .then(data => {
                setSlots(data);
            });
    }

    useEffect(() => {
        fetchSlots();
    }, []);

    const availabledSlots = slots.filter(
        slots => slots.is_available === 1
    );

    const groupedSlots = availabledSlots.reduce((acc, slot) => {
        if (!acc[slot.date])
            acc[slot.date] = [];
        acc[slot.date].push(slot);
        return acc;
    }, {});

    function handleSelect(slot) {
        setSelectedSlot(slot);
    }

    return (
        <section className="availabledSlots">
            <h2>Disponibilités</h2>
            {Object.keys(groupedSlots).map(date => {
                return (
                    <div key={date}>
                        <h3>{date}</h3>
                        <ul>
                            {groupedSlots[date].map(slot => {
                                return (
                                    <button 
                                        onClick={() => handleSelect(slot)} 
                                        key={slot.id}
                                        disabled={!slot.is_available}
                                        style={{
                                            backgroundColor: selectedSlot?.id === slot.id ? "lightgreen" : ""
                                        }}
                                    >
                                        {slot.time}
                                    </button>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}

            {selectedSlot && (
                <Booking 
                    slot={selectedSlot}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    onSuccess={() => setSelectedSlot(null)}
                    fetchSlots={fetchSlots}
                />
            )}
        </section>
    )
}