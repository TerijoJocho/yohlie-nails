import { useState } from "react";

export default function AddSlot() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    fetch("http://localhost:3001/admin/slots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date,
        time,
      }),
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
      .catch((err) => console.log("Erreur fetch:", err));

    setDate("");
    setTime("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="m-4 flex flex-col gap-3 rounded-lg border border-[#EFC7E5] p-4"
    >
      <label className="text-sm font-medium text-[#1C0F13]" htmlFor="date">
        Ajouter une date:
      </label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        required
      />
      <label className="text-sm font-medium text-[#1C0F13]" htmlFor="time">
        Ajouter une heure:
      </label>
      <input
        id="time"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        required
      />
      <button className="rounded-md bg-[#1C0F13] px-4 py-2 text-sm font-medium text-white hover:bg-[#85756E]">
        Ajouter
      </button>
    </form>
  );
}
