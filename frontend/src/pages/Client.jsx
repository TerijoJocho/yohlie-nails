import About from "../components/clients/About.jsx";
import Footer from "../components/clients/Footer.jsx";
import Info from "../components/clients/Info.jsx";
import Interests from "../components/clients/Interests.jsx";
import AvailableSlots from "../components/clients/AvailableSlots.jsx";

import { useState } from "react";

export default function Client() {
  const [showBtn, setShwoBtn] = useState(false);

  function displaySlots() {
    setShwoBtn((prev) => (prev = !prev));
  }

  return (
    <main className="flex flex-col">
      <Info />
      <About />
      <Interests />
      <button
        onClick={displaySlots}
        className="btn global-hover max-w-fit self-center mb-4">
        Voir les disponibilités
      </button>
      {showBtn && <AvailableSlots />}
      <Footer />
    </main>
  );
}
