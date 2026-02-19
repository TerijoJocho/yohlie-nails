import avatar from "../../assets/manucure-avatar.jpg";

export default function Info() {
  return (
    <header>
      <img
        className="w-full rounded-b-none rounded-t-lg"
        src={avatar}
        alt="A photo of well manucured hands"
      />
      <p className="mt-5 mb-0 text-center text-[25px] font-bold text-[#EEB1D5]">
        Yohlie Nails
      </p>
      <p className="mt-0 mb-5 text-center text-[12.8px] font-normal text-[#85756E]">
        French Manucure at home
      </p>
      <nav className="flex justify-evenly text-[#1C0F13]">
        <button className="btn global-hover">
            <i className="fa-solid fa-envelope"></i>
            Email
        </button>

        <button className="btn global-hover">
            <i className="fa-brands fa-instagram"></i>
            Instagram
        </button>
      </nav>
    </header>
  );
}
