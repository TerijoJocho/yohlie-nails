import { useState } from "react";

export default function DeleteSlot({toDelete, setToDelete}) {
  const [loading, setLoading] = useState(false);

  const handleDeleteSlotClick = () => {
    setLoading(true);
    const token = localStorage.getItem("adminToken");

    fetch(`http://localhost:3001/admin/slots/${toDelete}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403)
        {
          localStorage.removeItem("adminToken");
          window.location.reload();
          return;
        }

        if (!res.ok)
          throw new Error(`HTTP ${res.status}`);

        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log("Erreur de fetch:", err));
    
    setToDelete(0);
    setLoading(false);
  };

  return (
    <button
      onClick={handleDeleteSlotClick}
      className={`mt-3 w-fit self-center 
        rounded-md border border-red-500 px-4 py-2 
        text-sm font-medium text-red-600
        ${toDelete > 0 ? "hover:bg-red-50" : "disabled cursor-not-allowed"}`}
    >
      {loading ? "Chargement..." : "Supprimer une dispo"}
    </button>
  );
}
