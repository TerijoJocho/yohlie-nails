import About from "../components/About.jsx"
import Footer from "../components/Footer.jsx"
import Info from "../components/Info.jsx"
import Interests from "../components/Interests.jsx"
import AvailableSlots from "../components/AvailableSlots.jsx"
import "../App.css"

export default function Client() {
    return (
        <>
            <Info />
            <About />
            <Interests />
            <AvailableSlots />
            <Footer />
        </>
    )
}