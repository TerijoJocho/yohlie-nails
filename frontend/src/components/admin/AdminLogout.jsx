export default function AdminLogout({ onLogout }) {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("adminToken");
        window.location.reload();
        onLogout();
      }}
      className="w-fit self-center mt-4 rounded-md bg-[#1C0F13] px-4 py-2 text-sm font-medium text-white hover:bg-[#85756E]"
    >
      Déconnexion
    </button>
  );
}
