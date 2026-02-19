import { useState, useEffect } from "react";
import Booking from "./Booking";

export default function AvailableSlots() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [choices, setChoices] = useState([]);

  function fetchSlots() {
    fetch("http://localhost:3001/slots")
      .then((res) => res.json())
      .then((data) => {
        setSlots(data);
      });
  }

  useEffect(() => {
    fetchSlots();
  }, []);

  const availabledSlots = slots.filter((slots) => slots.is_available === 1);

  const groupedSlots = availabledSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  function handleSelect(slot) {
    setSelectedSlot(slot);
  }

  function formatDate(strDate) {
        const date = new Date(strDate);
        return (
            new Intl.DateTimeFormat('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(date)
        );
    }

  return (
    <section className="mt-6 flex flex-col justify-between">
        <h2 className="text-[#1C0F13] ml-2">Disponibilités: </h2>
        <div className="bg-[#85756E] p-3 m-2 rounded-md">
            {Object.keys(groupedSlots).map((date) => {
                return (
                <div key={date}>
                    <h3 className="text-sm font-medium text-white">{formatDate(date)}</h3>
                    <ul className="mt-2 mb-2 flex flex-wrap gap-2">
                    {groupedSlots[date].map((slot) => {
                        return (
                        <button
                            onClick={() => handleSelect(slot)}
                            key={slot.id}
                            disabled={!slot.is_available}
                            className="rounded border border-[#EEB1D5] px-3 py-1 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-50 tracking-widest"
                            style={{
                            backgroundColor:
                                selectedSlot?.id === slot.id ? "lightgreen" : "",
                            }}
                        >
                            {slot.time}
                        </button>
                        );
                    })}
                    </ul>
                </div>
                );
            })}
        </div>
        <div>
            {selectedSlot && (
                <Booking
                slot={selectedSlot}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                choices={choices}
                setChoices={setChoices}
                onSuccess={() => setSelectedSlot(null)}
                fetchSlots={fetchSlots}
                />
            )}
        </div>

    </section>
  );
}
