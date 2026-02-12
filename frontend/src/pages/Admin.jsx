import { useState } from "react";
import AdminLogin from "../components/AdminLogin.jsx";
import AddSlot from "../components/AdminAddSlot.jsx"
import WelcomeAdmin from "../components/WelcomeAdmin.jsx"
import GetSlots from "../components/AdminGetSlots.jsx"
import DeleteSlot from "../components/AdminDeleteSlot.jsx"
import AdminLogout from "../components/AdminLogout.jsx"



export default function Admin() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("adminToken"));

    return (
        <>
            {!isLogged ? (
              <AdminLogin onLogin={() => setIsLogged(true)} />
            ) : (
              <>
                <WelcomeAdmin />
                <GetSlots />
                <AddSlot />
                <DeleteSlot />
                <AdminLogout onLogout={() => setIsLogged(false)}/>
              </>
            )}
        </>
    );
}