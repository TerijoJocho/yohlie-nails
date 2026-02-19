import { useState } from "react";
import tarifData from "../../data/tarif-data.js";

export default function Booking({
  slot,
  name,
  setName,
  email,
  setEmail,
  choices,
  setChoices,
  onSuccess,
  fetchSlots,
}) {
  const [hasClicked, setHasClicked] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  function handleBooking(e) {
    e.preventDefault();
    setHasClicked(true);
    fetch(`${import.meta.env.VITE_API_URL}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: slot.id,
        client_name: name,
        client_email: email,
        client_choices: choices,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConfirmationMessage(
          `Réservation confirmée pour le ${formatDate(slot.date)} à ${slot.time} !`,
        );
        fetchSlots();
        setTimeout(() => {
          onSuccess();
        }, 3000);
        setHasClicked(false);
      });
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

    const displayChoice = tarifData.map((tarif) => {
      return (
        <div key={tarif.id} className="flex items-center gap-2 p-2 text-[#85756E]">
          <label className="text-sm font-medium" htmlFor={`${tarif.name}`}>
            {tarif.name} - {tarif.price}
          </label>
          <input
            id={`${tarif.name}`}
            type="checkbox"
            checked={choices.includes(tarif.name)}
            onChange={(e) => {
              if (e.target.checked)
                setChoices([...choices, tarif.name]);
              else
              setChoices(choices.filter(name => name !== tarif.name));  
            }}
            className="rounded-md border border-[#EEB1D5] px-3 py-2 text-sm"
          />
        </div>
      );
    })

  return (
    <>
      <form
        onSubmit={handleBooking}
        className="m-4 flex flex-col gap-3 rounded-lg border border-[#EEB1D5] p-4"
      >
        <p className="text-sm font-medium text-[#1C0F13]">
          Réservation pour le {formatDate(slot.date)} à {slot.time}
        </p>

        <label className="text-sm font-medium text-[#1C0F13]" htmlFor="name">
          Votre nom et prenom
        </label>
        <input
          id="name"
          type="text"
          placeholder="Gonzales Ricardo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-[#EEB1D5] px-3 py-2 text-sm"
          required
        />

        <label className="text-sm font-medium text-[#1C0F13]" htmlFor="email">
          Votre email
        </label>
        <input
          id="email"
          type="email"
          placeholder="ricardo.gonzales@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-[#EEB1D5] px-3 py-2 text-sm"
          required
        />

        <p className="text-sm font-medium text-[#1C0F13]">
          Choix de prestation
        </p>
        {displayChoice}

        {
          !confirmationMessage
            ? <button className="btn global-hover max-w-fit self-center mt-4">
                {
                  !hasClicked ? <p>Confirmer</p> : <p>Chargement...</p>
                }
              </button>
            : <div 
                role="alert"
                className="m-3 rounded-lg border border-green-500 bg-green-50 text-sm font-medium text-green-600"
              >
                {confirmationMessage}
              </div>
        }
      </form>
    </>
  );
}
