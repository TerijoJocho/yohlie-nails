import { useState, useEffect } from "react";

export default function AdminSlots({setToDelete}) {
  const [slots, setSlots] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  function fetchSlots() {
    const token = localStorage.getItem("adminToken");

    fetch("http://localhost:3001/admin/slots", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("adminToken");
          window.location.reload();
          return;
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setSlots(data))
      .catch((err) => console.log("Erreur de fetch:", err));
  }

  useEffect(() => {
    fetchSlots();
  }, []);

  const groupedSlots = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  function formatDate(slotDate) {
    const date = new Date(slotDate);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  function handleClick(slot) {
    if (!slot.is_available)
      return;
    setSelectedId(selectedId === slot.id ? null : slot.id);
    setToDelete(slot.id);
  }

  return (
    <>
      <p className="m-0 px-[12px] py-[20px] text-[18px] font-medium">
        Voici l'agenda des disponibilités:
      </p>
      <section className="bg-[#85756E] p-3 m-2 rounded-md">
            {Object.keys(groupedSlots).map((date) => {
                return (
                <div key={date}>
                    <h3 className="text-sm font-medium text-white">{formatDate(date)}</h3>
                    <ul className="mt-2 mb-2 flex flex-wrap gap-2">
                    {groupedSlots[date].map((slot) => {
                        return (
                          <button 
                            key={slot.id}
                            onClick={() => handleClick(slot)}
                            className={`
                              rounded border border-[#EEB1D5] px-3 py-1 
                              text-sm  
                              tracking-widest
                              ${selectedId === slot.id && slot.is_available ? "bg-green-300" : ""}
                              ${!slot.is_available ? "opacity-50 cursor-not-allowed text-gray-300" : "hover:bg-[#EEB1D5] text-white"}
                            `}
                          >
                            {slot.time}
                          </button>
                        );
                    })}
                    </ul>
                </div>
                );
            })}
        </section>
    </>
  );
}
