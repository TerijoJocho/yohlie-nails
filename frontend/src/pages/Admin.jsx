import { useState } from "react";
import AdminLogin from "../components/admin/AdminLogin.jsx";
import AddSlot from "../components/admin/AdminAddSlot.jsx";
import WelcomeAdmin from "../components/admin/WelcomeAdmin.jsx";
import GetSlots from "../components/admin/AdminGetSlots.jsx";
import DeleteSlot from "../components/admin/AdminDeleteSlot.jsx";
import AdminLogout from "../components/admin/AdminLogout.jsx";
export default function Admin() {
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem("adminToken"),
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {!isLogged ? (
        <AdminLogin onLogin={() => setIsLogged(true)} />
      ) : (
        <>
          <WelcomeAdmin />
          <GetSlots />
          <AddSlot />
          <DeleteSlot />
          <AdminLogout onLogout={() => setIsLogged(false)} />
        </>
      )}
    </div>
  );
}
