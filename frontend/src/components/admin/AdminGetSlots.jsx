import { useState, useEffect } from "react";

export default function AdminSlots() {
  const [slots, setSlots] = useState([]);

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

  function getFrTime(slotDate) {
    const date = new Date(slotDate);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  return (
    <>
      <p className="m-0 px-[12px] py-[20px] text-[18px] font-medium">
        Voici l'agenda des disponibilités:
      </p>
      <section>
        {Object.keys(groupedSlots).map((date) => {
          return (
            <div className="flex" key={date}>
              <p className="m-0 mb-[6px] ml-[12px] border border-white">
                {getFrTime(date)}
              </p>
              <ul>
                {groupedSlots[date].map((slot) => {
                  return (
                    <li
                      className="mt-[4px] list-none rounded-[4px] border border-white bg-[aliceblue] p-[2px]"
                      key={slot.id}
                    >
                      {slot.time}
                    </li>
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
