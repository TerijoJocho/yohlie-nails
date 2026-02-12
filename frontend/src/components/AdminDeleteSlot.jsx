export default function DeleteSlot() {
  const handleDeleteSlotClick = () => {
    for (let i = 1; i < 30; i++)
    {
      fetch(`http://localhost:3001/slots/${i}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}`},
      })
        .then(res => res.json())
        .then(data => console.log(data))
    }
  };

  return (
    <button onClick={handleDeleteSlotClick}>Supprimer une dispo</button>
  )
}