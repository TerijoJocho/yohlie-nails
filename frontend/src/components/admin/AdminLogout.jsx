export default function AdminLogout({ onLogout }) {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("adminToken");
        window.location.reload();
        onLogout();
      }}
      className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
    >
      Déconnexion
    </button>
  );
}
