export default function AdminLogout({onLogout}) {
    return (
        <button
            onClick={() => {
                localStorage.removeItem("adminToken");
                window.location.reload();
                onLogout();
            }}
        >Déconnexion</button>
    )
}