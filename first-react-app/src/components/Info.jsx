import avatar from "../assets/manucure-avatar.jpg"
import "./Info.css"

export default function Info() {
    return (
        <header>
            <img 
                className="avatar-img"
                src={avatar} 
                alt="A photo of well manucured hands"
            />
            <p className="info-title">Yohlie Nails</p>
            <p className="info-subtitle">French Manucure at home</p>
            <nav className="links">
                <div className="link-btn email">
                    <i className="fa-solid fa-envelope"></i>
                    <a href="#" target="_blank">Email</a>
                </div>

                <div className="link-btn facebook">
                    <i className="fa-brands fa-facebook"></i>
                    <a href="#" target="_blank">Facebook</a>
                </div>
</nav>
        </header>
    )
}