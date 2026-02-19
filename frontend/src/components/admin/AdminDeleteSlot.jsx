export default function DeleteSlot() {
  const handleDeleteSlotClick = () => {
    for (let i = 1; i < 30; i++) {
      fetch(`http://localhost:3001/slots/${i}`, {
        method: "DELETE",
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
        .then((data) => console.log(data))
        .catch((err) => console.log("Erreur de fetch:", err));
    }
  };

  return (
    <button
      onClick={handleDeleteSlotClick}
      className="mt-3 rounded-md border border-red-500 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
    >
      Supprimer une dispo
    </button>
  );
}
