import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin.jsx"
import Client from "./pages/Client.jsx"

export default function App() {
    return (
          <Router>
            <Routes>
              <Route path="/" element={<Client />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Router>
    )
}