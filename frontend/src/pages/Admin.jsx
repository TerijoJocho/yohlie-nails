import AddSlot from "../components/AddSlot.jsx"
import WelcomeAdmin from "../components/WelcomeAdmin.jsx"
import AdminSlots from "../components/AdminSlots.jsx"

function DeleteSlot() {
  const handleDeleteSlotClick = () => {
    for (let i = 1; i < 30; i++)
    {
      fetch(`http://localhost:3001/slots/${i}`, {method: "DELETE"})
        .then(res => res.json())
        .then(data => console.log(data))
    }
  };

  return (
    <button onClick={handleDeleteSlotClick}>Delete a slot</button>
  )
}

export default function Admin() {
    return (
        <>
            <WelcomeAdmin />
            <AdminSlots />
            <AddSlot />
            {/* <DeleteSlot /> */}
        </>
    )
}